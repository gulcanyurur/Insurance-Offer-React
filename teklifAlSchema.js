import * as Yup from 'yup';

const teklifAlSchema = (isForSomeoneElse) => {
  let commonValidationObj = {
    tcIdentity: isForSomeoneElse ? Yup.string().nullable() : Yup.string()
      .required('TC Kimlik Numarası zorunludur')
      .matches(/^[0-9]{11}$/, 'TC Kimlik Numarası 11 rakamdan oluşmalıdır'),
    birthDate: isForSomeoneElse ? Yup.date().nullable() : Yup.date()
      .required('Doğum tarihi zorunludur'),
    email: isForSomeoneElse ? Yup.string().nullable() : Yup.string()
      .email('Geçerli bir e-posta adresi giriniz')
      .required('E-Posta adresi zorunludur'),
    phoneNumber: isForSomeoneElse ? Yup.string().nullable() : Yup.string()
      .required('Telefon numarası zorunludur')
      .matches(/^\d{10}$/, 'Telefon numarası 10 haneli olmalıdır'),
    kvkApproval: isForSomeoneElse ? Yup.boolean().nullable() : Yup.boolean()
      .oneOf([true], 'Lütfen KVKK Aydınlatma Metnini onaylayınız'),
    contractApproval: isForSomeoneElse ? Yup.boolean().nullable() : Yup.boolean()
      .oneOf([true], 'Lütfen Kullanıcı sözleşmesini onaylayınız'),
    communicationPermission: Yup.boolean().nullable(), // Zorunlu değil
  };

  if (isForSomeoneElse) {
    commonValidationObj = {
      ...commonValidationObj,
      insuredTCIdentity: Yup.string()
        .required('Sigorta Ettiren TC Kimlik Numarası zorunludur')
        .matches(/^[0-9]{11}$/, 'Sigorta Ettiren TC Kimlik Numarası 11 rakamdan oluşmalıdır'),
      insuredBirthDate: Yup.date()
        .required('Sigorta Ettiren doğum tarihi zorunludur'),
      insuredEmail: Yup.string()
        .email('Geçerli bir e-posta adresi giriniz')
        .required('Sigorta Ettiren E-Posta adresi zorunludur'),
      insuredPhoneNumber: Yup.string()
        .required('Sigorta Ettiren telefon numarası zorunludur')
        .matches(/^\d{10}$/, 'Sigorta Ettiren telefon numarası 10 haneli olmalıdır'),
      insurerTCIdentity: Yup.string()
        .required('Sigortalı TC Kimlik Numarası zorunludur')
        .matches(/^[0-9]{11}$/, 'Sigortalı TC Kimlik Numarası 11 rakamdan oluşmalıdır'),
      insurerBirthDate: Yup.date()
        .required('Sigortalı doğum tarihi zorunludur'),
      insurerEmail: Yup.string()
        .email('Geçerli bir e-posta adresi giriniz')
        .required('Sigortalı E-Posta adresi zorunludur'),
      insurerPhoneNumber: Yup.string()
        .required('Sigortalı telefon numarası zorunludur')
        .matches(/^\d{10}$/, 'Sigortalı telefon numarası 10 haneli olmalıdır'),
      insurerKVKApproval: Yup.boolean()
        .oneOf([true], 'Sigortacı KVKK onayı gereklidir'),
      insurerContractApproval: Yup.boolean()
        .oneOf([true], 'Sigortacı Kullanıcı sözleşmesi onayı gereklidir'),
      insurerCommunicationPermission: Yup.boolean().nullable(), // Zorunlu değil
    };
  }
  
  return Yup.object().shape(commonValidationObj);
}

export default teklifAlSchema;





