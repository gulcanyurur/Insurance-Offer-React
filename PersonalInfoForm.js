import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import './teklif-al.css';
import { useDataContext } from './DataContext';
import Modal from './Modal';
import teklifAlSchema from './teklifAlSchema';

const PersonalInfoForm = ({ onNext }) => {
  const [isForSelf, setIsForSelf] = useState(true);
  const [isForSomeoneElse, setIsForSomeoneElse] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { personalInfo, updatePersonalInfo, updateIds } = useDataContext();

  const checkTCIdentity = async (tcIdentity, setFieldValue, section) => {
    try {
      const url = section === 'self' || section === 'insurer'
        ? `http://localhost:26131/api/Insurers/byTC/${tcIdentity}`
        : `http://localhost:26131/api/Insureds/byTC/${tcIdentity}`;
      const response = await axios.get(url);
      const data = response.data.data;
      if (data) {
        if (section === 'self') {
          setFieldValue('birthDate', data.dateOfBirth ? data.dateOfBirth.substring(0, 10) : '');
          setFieldValue('email', data.email);
          setFieldValue('phoneNumber', data.phoneNumber);
          setFieldValue('kvkApproval', data.kvkApproval);
          setFieldValue('contractApproval', data.contractApproval);
          setFieldValue('communicationPermission', data.communicationPermission);
          updateIds({ insurerId: data.insurerID });
        } else if (section === 'insured') {
          setFieldValue('insuredBirthDate', data.dateOfBirth ? data.dateOfBirth.substring(0, 10) : '');
          setFieldValue('insuredEmail', data.email);
          setFieldValue('insuredPhoneNumber', data.phoneNumber);
          updateIds({ insuredId: data.insuredID });
        } else if (section === 'insurer') {
          setFieldValue('insurerBirthDate', data.dateOfBirth ? data.dateOfBirth.substring(0, 10) : '');
          setFieldValue('insurerEmail', data.email);
          setFieldValue('insurerPhoneNumber', data.phoneNumber);
          updateIds({ insurerId: data.insurerID });
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error fetching data by TC:', error);
      return false;
    }
  };

  const handleSubmit = async (values, { setFieldValue }) => {
    updatePersonalInfo(values);

    let insuredExists, insurerExists;

    if (isForSelf) {
      insuredExists = await checkTCIdentity(values.tcIdentity, setFieldValue, 'self');
    } else {
      insuredExists = await checkTCIdentity(values.insuredTCIdentity, setFieldValue, 'insured');
      insurerExists = await checkTCIdentity(values.insurerTCIdentity, setFieldValue, 'insurer');
    }

    const saveData = async (data, url) => {
      try {
        const response = await axios.post(url, data);
        const savedData = response.data;
        if (url.includes('Insureds')) {
          updateIds({ insuredId: savedData.insuredID });
        } else if (url.includes('Insurers')) {
          updateIds({ insurerId: savedData.insurerID });
        }
        return true;
      } catch (err) {
        console.error('Data saving error:', err);
        return false;
      }
    };

    let insuredSaved = false;
    let insurerSaved = false;

    if (!insuredExists && isForSomeoneElse) {
      const insuredData = {
        tckn: values.insuredTCIdentity,
        phoneNumber: values.insuredPhoneNumber,
        email: values.insuredEmail,
        dateOfBirth: values.insuredBirthDate ? new Date(values.insuredBirthDate).toISOString() : null,
      };
      insuredSaved = await saveData(insuredData, 'http://localhost:26131/api/Insureds');
    }

    if (!insurerExists && isForSomeoneElse) {
      const insurerData = {
        tckn: values.insurerTCIdentity,
        phoneNumber: values.insurerPhoneNumber,
        email: values.insurerEmail,
        dateOfBirth: values.insurerBirthDate ? new Date(values.insurerBirthDate).toISOString() : null,
      };
      insurerSaved = await saveData(insurerData, 'http://localhost:26131/api/Insurers');
    }

    if (isForSelf && !insuredExists) {
      const selfData = {
        tckn: values.tcIdentity,
        phoneNumber: values.phoneNumber,
        email: values.email,
        dateOfBirth: values.birthDate ? new Date(values.birthDate).toISOString() : null,
        kvkApproval: values.kvkApproval,
        contractApproval: values.contractApproval,
        communicationPermission: values.communicationPermission,
      };
      insuredSaved = await saveData(selfData, 'http://localhost:26131/api/Insurers');
    }

    if (insuredSaved || insurerSaved) {
      alert('Müşteri bilgileriniz başarıyla kaydedilmiştir.');
    }

    onNext();
  };

  const openModal = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="container-teklif">
      <div className="form-container">
        <h1>Seyahat Sağlık Sigortası Teklif Al</h1>
        <p>Kendiniz için mi yoksa bir başkası için mi, Seyahat Sağlık Sigortası teklifi almak istiyorsunuz?</p>

        <div className="question-container">
          <div className="custom-checkbox">
            <label>
              <input
                type="checkbox"
                checked={isForSelf}
                onChange={() => {
                  setIsForSelf(true);
                  setIsForSomeoneElse(false);
                }}
              />
              Kendim için
            </label>
          </div>
          <div className="custom-checkbox">
            <label>
              <input
                type="checkbox"
                checked={isForSomeoneElse}
                onChange={() => {
                  setIsForSomeoneElse(true);
                  setIsForSelf(false);
                }}
              />
              Bir başkası için
            </label>
          </div>
        </div>

        <Formik
          initialValues={{
            tcIdentity: '',
            birthDate: '',
            email: '',
            phoneNumber: '',
            kvkApproval: false,
            contractApproval: false,
            communicationPermission: false,
            insuredTCIdentity: '',
            insuredBirthDate: '',
            insuredEmail: '',
            insuredPhoneNumber: '',
            insurerTCIdentity: '',
            insurerBirthDate: '',
            insurerEmail: '',
            insurerPhoneNumber: '',
            insurerKVKApproval: false,
            insurerContractApproval: false,
            insurerCommunicationPermission: false,
          }}
          validationSchema={teklifAlSchema(isForSomeoneElse)}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              {isForSelf && (
                <div className="form-for-self-container">
                  <div>
                    <label>
                      T.C. Kimlik Numarası (11 Hane):
                      <Field
                        type="text"
                        name="tcIdentity"
                        value={values.tcIdentity}
                        onChange={(e) => setFieldValue('tcIdentity', e.target.value)}
                        onBlur={(e) => checkTCIdentity(e.target.value, setFieldValue, 'self')}
                      />
                    </label>
                    <ErrorMessage name="tcIdentity" component="div" className="error-message" />
                  </div>

                  <div>
                    <label>
                      Doğum Tarihi:
                      <Field type="date" name="birthDate" />
                    </label>
                  </div>

                  <div>
                    <label>
                      E-Posta Adresi:
                      <Field type="email" name="email" />
                    </label>
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>

                  <div>
                    <label>
                      Cep Telefonu Numarası:
                      <Field type="tel" name="phoneNumber" />
                    </label>
                    <ErrorMessage name="phoneNumber" component="div" className="error-message" />
                  </div>

                  <div className="custom-container">
                    <div>
                      <label>
                        <Field type="checkbox" name="kvkApproval" />
                        <span onClick={() => openModal('KVKK Aydınlatma Metni')}>
                          KVKK Aydınlatma Metni
                        </span> okudum ve onaylıyorum
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field type="checkbox" name="contractApproval" />
                        <span onClick={() => openModal('Kullanıcı Sözleşmesi')}>
                          Kullanıcı Sözleşmesi
                        </span> okudum ve onaylıyorum
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field type="checkbox" name="communicationPermission" />
                        <span onClick={() => openModal('İletişim İzni Metni')}>
                          İletişim İzni Metni
                        </span> okudum ve onaylıyorum
                      </label>
                    </div>
                  </div>
                  {modalContent && <Modal content={modalContent} onClose={closeModal} />}

                  <div className='button-devam'>
                    <button type="submit" className="submit-button">
                      Devam
                    </button>
                  </div>
                </div>
              )}

              {isForSomeoneElse && (
                <div className="form-for-someone-else-container">
                  <h2 className="centered-heading">Sigortalı</h2>
                  <div>
                    <label>
                      T.C. Kimlik Numarası (11 Hane):
                      <Field
                        type="text"
                        name="insuredTCIdentity"
                        value={values.insuredTCIdentity}
                        onChange={(e) => setFieldValue('insuredTCIdentity', e.target.value)}
                        onBlur={(e) => checkTCIdentity(e.target.value, setFieldValue, 'insured')}
                      />
                    </label>
                    <ErrorMessage name="insuredTCIdentity" component="div" className="error-message" />
                  </div>

                  <div>
                    <label>
                      Doğum Tarihi (Gün/Ay/Yıl):
                      <Field type="date" name="insuredBirthDate" />
                    </label>
                    <ErrorMessage name="insuredBirthDate" component="div" className="error-message" />
                  </div>

                  <div>
                    <label>
                      E-Posta Adresi:
                      <Field type="email" name="insuredEmail" />
                    </label>
                    <ErrorMessage name="insuredEmail" component="div" className="error-message" />
                  </div>

                  <div>
                    <label>
                      Cep Telefonu Numarası:
                      <Field type="tel" name="insuredPhoneNumber" />
                    </label>
                    <ErrorMessage name="insuredPhoneNumber" component="div" className="error-message" />
                  </div>

                  <h2 className="centered-heading">Sigorta Ettiren</h2>
                  <div>
                    <label>
                      T.C. Kimlik Numarası (11 Hane):
                      <Field
                        type="text"
                        name="insurerTCIdentity"
                        value={values.insurerTCIdentity}
                        onChange={(e) => setFieldValue('insurerTCIdentity', e.target.value)}
                        onBlur={(e) => checkTCIdentity(e.target.value, setFieldValue, 'insurer')}
                      />
                    </label>
                    <ErrorMessage name="insurerTCIdentity" component="div" className="error-message" />
                  </div>

                  <div>
                    <label>
                      Doğum Tarihi (Gün/Ay/Yıl):
                      <Field type="date" name="insurerBirthDate" />
                    </label>
                    <ErrorMessage name="insurerBirthDate" component="div" className="error-message" />
                  </div>

                  <div>
                    <label>
                      E-Posta Adresi:
                      <Field type="email" name="insurerEmail" />
                    </label>
                    <ErrorMessage name="insurerEmail" component="div" className="error-message" />
                  </div>

                  <div>
                    <label>
                      Cep Telefonu Numarası:
                      <Field type="tel" name="insurerPhoneNumber" />
                    </label>
                    <ErrorMessage name="insurerPhoneNumber" component="div" className="error-message" />
                  </div>

                  <div className="custom-container">
                    <div>
                      <label>
                        <Field type="checkbox" name="insurerKVKApproval" />
                        <span onClick={() => openModal('KVKK Aydınlatma Metni')}>
                          KVKK Aydınlatma Metni
                        </span> okudum ve onaylıyorum
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field type="checkbox" name="insurerContractApproval" />
                        <span onClick={() => openModal('Kullanıcı Sözleşmesi')}>
                          Kullanıcı Sözleşmesi
                        </span> okudum ve onaylıyorum
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field type="checkbox" name="insurerCommunicationPermission" />
                        <span onClick={() => openModal('İletişim İzni Metni')}>
                          İletişim İzni Metni
                        </span> okudum ve onaylıyorum
                      </label>
                    </div>
                  </div>
                  {modalContent && <Modal content={modalContent} onClose={closeModal} />}

                  <div className='button-devam'>
                    <button type="submit" className="submit-button">
                      Devam
                    </button>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PersonalInfoForm;




















