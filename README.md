# Seyahat Sağlık Sigortası Uygulaması
Bu proje, kullanıcıların seyahat sağlık sigortası teklifleri almasını, ödeme yapmasını ve poliçe bilgilerini görüntülemesini sağlayan bir uygulamadır.
## Özellikler

- **React ve .NET Core**: Uygulama, React ile frontend ve .NET Core API ile backend geliştirilmiştir.
- **React Router DOM**: Farklı sayfalar arasında gezinmeyi sağlar.
- **Carousel Bileşeni**: Görseller ve açıklamalar içeren dönen bir slider sağlar.
- **DataContext Kullanımı**: Global state yönetimi sağlar.
- **Form Yönetimi**: 6 adımdan oluşan dinamik bir form (Kişisel Bilgiler, Seyahat Bilgileri, Teminat Seçimi, Teklif, Ödeme ve Poliçe) sunar.
- **Ödeme İşlemleri**: Formik ve Axios kullanılarak ödeme işlemleri gerçekleştirilir ve ödeme bilgileri saklanır.
- **Poliçe Sayfası**: Kullanıcıya poliçe bilgilerini gösteren dinamik bir sayfa sunar.

## Kullanılan Teknolojiler

- **Frontend**: React, React Router DOM, Axios, Context API
- **Backend**: .NET Core, Entity Framework, SQL Server
- **Diğer**: Formik, Yup, Moment.js, FontAwesome

## App.js bileşeni 
React uygulamam için temel bileşenleri App.js dosyasında oluşturdum. Route, DataContext, Header, Carousel, Navbar, teklifAl, App.css, CustomFooter, ServiceServicesComponent bileşenlerini import ettim ve react-router-dom ile yönlendirme işlevselliğini ekledim. Router bileşeniyle uygulamanın yapısını oluşturarak ana sayfa ve teklif al sayfasına yönlendirmeler ekledim. Başlık bileşenini Header olarak kullanarak uygulama başlığını her iki sayfada da gösterdim. Ana sayfa için görseller ve açıklamalar içeren bir images array'i Carousel bileşeninde kullanarak slider olarak gösterdim.
## Carousel bileşeni
Carousel bileşeninde slayt gösterisi için currentIndex state'i kullanarak durum yönetimi sağladım. useEffect hook'u kullanarak her üç saniyede bir resmi değiştiren bir interval oluşturdum. handlePrevClick fonksiyonu ile önceki resme geçiş yapılmasını sağladım, bu fonksiyon mevcut interval'i durdurur ve currentIndex'i günceller. Return bloğunda, şu an gösterilen resmin URL'si, başlığı ve açıklaması ile birlikte Carousel bileşeninin görüntüsünü tanımladım, böylece kullanıcı resimler arasında geçiş yapabilir ve otomatik olarak yeni resimler gösterilir.
## Navbar Bileşeni
Navbar bileşenimde useState hook'u ile seçili öğenin durumunu 'kasko' olarak başlangıç değeriyle tuttum. HandleItemClick fonksiyonuyla öğeler arasında geçiş yapmayı sağladım. Return bloğunda <nav> etiketiyle navigasyon bağlantılarını içeren bir blok oluşturdum. <ul> etiketiyle sırasız bir liste oluşturup, items dizisini map fonksiyonuyla gezerek her öğe için <li> öğesi oluşturdum ve seçili öğeyi belirtmek için className="navbar-item" ekledim. Seçili öğe aktif olduğunda, başlığının altına mavi renkli bir çizgi ve seçili öğenin içeriğini ve resmini gösterdim. Son olarak, teklif al sayfasına yönlendiren bir buton oluşturup, Link bileşeniyle yönlendirme sağladım.Seyahat sağlık hemen teklif al buttonuma tıkladığımda teklif al sayfasına yönlendirdim.
## AnotherCustomFooter
AnotherCustomFooter bileşeninde, altbilgi içeriklerini <footer> etiketi ve "another-footer" CSS sınıfıyla düzenledim. Footer, dört ana bölümden (another-footer-section) oluşur; her bir bölümde <h4> başlıkları ve <ul> listeleri bulunur. Return bloğunda, <footer> etiketiyle başlayan ve "another-footer" CSS sınıfını içeren bir yapı oluşturdum. Her bölüm için ayrı bir <div> veya <section> kullandım. Bu yapı sayesinde, kullanıcıya erişilebilir ve okunabilir bir altbilgi sunmayı amaçladım.
##  TeklifAl
TeklifAl bileşeninde, öncelikle 6 adımdan oluşan bir form oluşturmak için gerekli bileşenleri (PersonalInfoForm, TravelDetail, Coverage, Offer, PaymentForm, PolicyPage) import ettim.
useStateleri kullanarak activeStep (aktif adımı tutar), selectedDates (seçilen tarihleri tutar) ve totalPrice (toplam fiyatı tutar) state'lerini tanımladım. Bu state'leri, daha az yer kaplaması ve adımlar arasında geçiş yaparken kullanmak için kullandım.
TeklifAl fonksiyonunu tanımladım ve içinde step dizisini oluşturdum. Bu dizide adımların sırasını belirttim.
Her adım için ilgili fonksiyon bileşenini oluşturdum. handleNext fonksiyonu, sonraki adıma geçişi sağlar ve fiyat bilgilerini güncellemeyi sağlar. handleBack fonksiyonu, önceki adıma geçişi sağlar. handleReset fonksiyonu ise adımları sıfırlar.
Her adım bileşeninde, onNext props'unu kullanarak bir sonraki adıma geçişi sağladım. TravelInfo bileşeninde seçilen tarihleri props olarak kullandım. CoverageInfo bileşeninde onNext ve onBack props'larını kullandım. Button bileşenlerinin props'larını her fonksiyonda ilgili yerlerde kullandım.
Bu yapı sayesinde, TeklifAl bileşenimdeki adımları düzenli bir şekilde yöneterek, kullanıcının adım adım ilerleyebileceği ve her adımda gerekli bilgileri doldurabileceği bir form oluşturdum.
## PersonalInfoForm
PersonalInfoForm bileşeni, kullanıcının kişisel bilgilerini girmesi için ilk adım olarak tasarlanmıştır.
Bileşen içinde onNext props'unu alır ve bir sonraki adıma geçmek için kullanılır. useState hook'u kullanarak aşağıdaki state'leri tanımladım:
•	isForSelf ve setIsForSelf: Formun kullanıcı kendisi için mi? yoksa başka biri için mi doldurulduğunu belirler. Başlangıçta true (kendi için).
•	isForSomeoneElse ve setIsForSomeoneElse: Formun başka biri için doldurulup doldurulmadığını belirler. Başlangıçta false.
•	modalContent ve setModalContent: Modal pencerede gösterilecek içeriği tutar. Başlangıçta null.
useDataContext hook'u kullanarak global state'ten bazı verileri ve fonksiyonları aldım. CheckTCIdentity fonksiyonu, TC kimlik numarasını doğrulayan ve ilgili bilgileri getiren asenkron bir fonksiyon olarak tanımladım. setFieldValue fonksiyonuyla, Formik tarafından sağlanan form alanlarının değerlerini güncelledim.
Section parametresini kullanarak, formun hangi bölümde olduğunu (sigortalı mı, sigorta ettiren mi) belirledim. Veri tabanımda zaten sigorta ettiren ve sigortalı için ayrı tablolar olduğunu varsayarak, ilgili API'leri çağırmasını sağladım. Eğer veri varsa, form alanlarını güncelledim ve ilgili ID'leri de güncelledim. Veri yoksa, false döndürmesini istedim.
HandleSubmit fonksiyonu, kullanıcının girdiği bilgileri güncelleyen bir fonksiyon olarak tanımlandı. Kullanıcı, sigorta teklifi almak için kendisi mi yoksa başka biri mi için bilgi girdiğini kontrol eder. Eğer sigortalı mevcut değilse, kendi bilgilerini kaydetmesini sağladım ve kaydedilen bilgileri bir alert mesajı ile kullanıcıya gösterdim.
Ayrıca, modal pencerelerini açmak ve kapatmak için gerekli fonksiyonları da tanımladım. Bu şekilde, PersonalInfoForm bileşeninde kullanıcı dostu bir form deneyimi sağladım ve adım adım ilerlemesini sağladım.
## Traveldetail bileşeni
Traveldetail bileşeninde kullanıcıdan seyahat bilgilerini almayı hedefledim. İşte bileşenin yapısını ve işlevlerini açıklayan detaylar:
useState Kullanımı:
o	localTravelData: Kullanıcının seyahat bilgilerini geçici olarak saklamak için useState hook'u ile oluşturulmuş durum değişkeni.
o	errorMessages: Formun doğrulama hatalarını saklamak için kullanılan bir durum değişkeni.
2.	Fonksiyonlar:
o	handleDateChange: Tarih seçici (DatePicker) bileşenindeki değişiklikleri işler. Kullanıcı tarafından seçilen başlangıç ve bitiş tarihlerini günceller ve bu bilgileri localTravelData ve DataContext aracılığıyla merkezi veri deposuna (DataContext) yansıtır.
o	handleCheckboxChange: Checkbox bileşenlerindeki değişiklikleri yönetir. Checkbox'ın durumuna göre diğer checkbox'ların durumunu kontrol eder ve seçili olanın durumunu günceller.
3.	DatePicker Kullanımı:
o	React'ın kendi DatePicker bileşeni kullanılarak, kullanıcıya tarih seçme imkanı sunulur. minDate özelliğiyle, kullanıcının bugünden önceki tarih seçmesini önler.
4.	Props:
o	onNext ve onBack: Diğer bileşenlere geçiş için props olarak alınır ve bu fonksiyonlar sayesinde kullanıcı adımları ileri geri geçebilir.
bileşen Coverage

Bu komponentte, kullanıcıya veritabanından çekilen teminatları gösterip seçim yapma imkanı sağladım. useState hook'uyla teminatların seçilme durumunu, detaylarının açık/kapalı olma durumunu, ilk teminatın eklenip eklenmediğini ve "Tümünü Göster" düğmelerinin durumunu yönettim. Axios ile veritabanından teminat verilerini çekerek handleAddCoverage fonksiyonuyla seçimlerin güncellenmesini sağladım. Kullanıcı arayüzünde map fonksiyonuyla teminatları listeleyerek, true/false seçenekleriyle tüm veya sınırlı sayıda teminat gösterme özelliği ekledim.
## Offer bileşeni

Offer bileşeninde, kullanıcıya seçtiği teminatlara göre teklif sunan bir yapı oluşturdum. useState ve useEffect ile React hook'larını import ettim. FontAwesomeIcon kütüphanesi için ikonları import ederken, veri çekmek için datacontext'i kullandım.
useState:
•	selectedOffer: Kullanıcının seçtiği teklif verilerini saklar. Başlangıç değeri null.
•	setSelectedOffer: selectedOffer state'ini güncellemek için kullanılan fonksiyon.
•	showAllButtonVisible: "Tümünü Gör" butonunun görünürlüğünü kontrol eder. Başlangıç değeri true.
•	setShowAllButtonVisible: showAllButtonVisible state'ini güncellemek için kullanılan fonksiyon.
•	expandedCoverage: Teminat açıklamalarının tamamının gösterilip gösterilmediğini kontrol eder. Başlangıç değeri false.
•	setExpandedCoverage: expandedCoverage state'ini güncellemek için kullanılan fonksiyon.
useEffect: Her render edildiğinde coverageData ve travelData değiştiğinde checkSelectedOffer fonksiyonunu çağırır. Eğer seçili bir teminat varsa teklif oluşturur, yoksa null değeri döndürür. HandleCreateOffer fonksiyonu ile ödeme verilerini güncelleyerek onNext ile bir sonraki adıma geçiş yapılır.

## PaymentForm
PaymentForm bileşeninde ödeme ekranı tasarladım. Formik ile form yönetimi ve Yup ile doğrulama şeması kullandım. Axios ile HTTP istekleri gerçekleştirip DataContext'ten seyahat ve ödeme bilgilerini aldım. Formik'in initialValues özelliği ile formun başlangıç değerlerini belirledim ve sadece seçili olanların fiyatlarını başlattım. Ödeme bilgilerini maskeledim ve yıldız karakterleriyle gizledim. Axios ile önce TravelDetail'e, sonra Payment'e istek göndererek bilgileri poliçeye kaydettim. Kaydedildiğinde "Ödeme bilginiz alınmıştır" şeklinde bir alert mesajı çıkardım. Alert'e tıklandığında poliçe sayfasına yönlendirildim ve poliçe numarası için rastgele bir değer oluşturdum.
## Poliçe sayfası
Poliçe sayfasında datacontext'ten verileri aldım ve PaymentForm'da rastgele oluşturduğum poliçe seri numarasını gösterdim. Kimlik numarasının ilk iki hanesini gösterip gerisini yıldızlarla gizlemek için maskedTc fonksiyonunu kullandım. Tarih verilerini moment kütüphanesiyle 'DD/MM/YYYY' formatına getirdim. CurrencySymbol ile ödeme yapılan para birimini belirledim. Sayfayı <div> ve <p> etiketleriyle oluşturup, poliçe sayfasına seri numarası için bir barkod ekledim.




