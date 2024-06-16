import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, IonList, IonTextarea, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import { supabase } from '/workspaces/rift-krqtbr/src/utils/supabaseClient'; // Asegúrate de que la ruta sea correcta
import './RegistrationForm.css';

interface CrewMember {
  name: string;
  age: string;
  phone: string;
  nationality: string;
}

interface Kid {
  name: string;
  age: string;
  gender: string;
}

interface RegistrationFormState {
  level: string;
  boatName: string;
  captainName: string;
  phone: string;
  address: string;
  email: string;
  nationality: string;
  category: string;
  boatBrand: string;
  boatColor: string;
  boatSize: string;
  crew: CrewMember[];
  kids: Kid[];
  crewSize: number;
  kidCount: number;
  language: string;
}

const RegistrationForm: React.FC = () => {
  const [form, setForm] = useState<RegistrationFormState>({
    level: '',
    boatName: '',
    captainName: '',
    phone: '',
    address: '',
    email: '',
    nationality: '',
    category: '',
    boatBrand: '',
    boatColor: '',
    boatSize: '',
    crew: [],
    kids: [],
    crewSize: 1,
    kidCount: 0,
    language: 'en'
  });

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      crew: Array.from({ length: prevForm.crewSize }, () => ({ name: '', age: '', phone: '', nationality: '' })),
      kids: Array.from({ length: prevForm.kidCount }, () => ({ name: '', age: '', gender: '' }))
    }));
  }, [form.crewSize, form.kidCount]);

  const handleInputChange = (e: CustomEvent, field: keyof RegistrationFormState) => {
    const value = (e.target as HTMLInputElement).value;
    setForm({ ...form, [field]: value });
  };

  const handleSelectChange = (e: CustomEvent, field: keyof RegistrationFormState) => {
    const value = e.detail.value;
    setForm({ ...form, [field]: value });
  };

  const handleCrewChange = (index: number, e: CustomEvent, field: keyof CrewMember) => {
    const value = (e.target as HTMLInputElement).value;
    const updatedCrew = [...form.crew];
    updatedCrew[index][field] = value;
    setForm({ ...form, crew: updatedCrew });
  };

  const handleKidsChange = (index: number, e: CustomEvent, field: keyof Kid) => {
    const value = (e.target as HTMLInputElement).value;
    const updatedKids = [...form.kids];
    updatedKids[index][field] = value;
    setForm({ ...form, kids: updatedKids });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('registrations')
        .insert([form]);
      
      if (error) {
        throw error;
      }

      alert('Registration successful!');
      window.location.href = '/page2'; // Cambia '/page2' a la ruta que desees
    } catch (error) {
      console.error('There was an error registering!', error);
      alert('Error during registration.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{form.language === 'en' ? 'Registration' : 'Registro'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="logo-container">
          <IonImg src="/workspaces/rift-krqtbr/src/components/logo.jpg" alt="Logo" className="logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>{form.language === 'en' ? 'Language' : 'Idioma'}</IonLabel>
                  <IonSelect value={form.language} onIonChange={(e) => handleSelectChange(e, 'language')}>
                    <IonSelectOption value="en">English</IonSelectOption>
                    <IonSelectOption value="es">Español</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel>{form.language === 'en' ? 'Level' : 'Nivel'}</IonLabel>
                  <IonSelect value={form.level} onIonChange={(e) => handleSelectChange(e, 'level')}>
                    <IonSelectOption value="Level 1 (BillFish Category and Rode $700)">{form.language === 'en' ? 'Level 1 (BillFish Category and Rode $700)' : 'Nivel 1 (Categoría BillFish y Rode $700)'}</IonSelectOption>
                    <IonSelectOption value="Level 2 (Rodeo Category $350)">{form.language === 'en' ? 'Level 2 (Rodeo Category $350)' : 'Nivel 2 (Categoría Rodeo $350)'}</IonSelectOption>
                    <IonSelectOption value="Level 3 (Junior Category $300)">{form.language === 'en' ? 'Level 3 (Junior Category $300)' : 'Nivel 3 (Categoría Junior $300)'}</IonSelectOption>
                    <IonSelectOption value="Kids (Participation $50)">{form.language === 'en' ? 'Kids (Participation $50)' : 'Nivel Kids (Participación $50)'}</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel>{form.language === 'en' ? 'Boat Name' : 'Nombre de la Embarcación'}</IonLabel>
                  <IonInput value={form.boatName} onIonChange={(e) => handleInputChange(e, 'boatName')} />
                </IonItem>
                <IonItem>
                  <IonLabel>{form.language === 'en' ? 'Captain Name' : 'Nombre del Capitán'}</IonLabel>
                  <IonInput value={form.captainName} onIonChange={(e) => handleInputChange(e, 'captainName')} />
                </IonItem>
                <IonItem>
                  <IonLabel>{form.language === 'en' ? 'Phone' : 'Teléfono'}</IonLabel>
                  <IonInput value={form.phone} onIonChange={(e) => handleInputChange(e, 'phone')} />
                </IonItem>
                <IonItem>
                  <IonLabel>{form.language === 'en' ? 'Address' : 'Dirección'}</IonLabel>
                  <IonTextarea value={form.address} onIonChange={(e) => handleInputChange(e, 'address')} />
                </IonItem>
                <IonItem>
                  <IonLabel>Email</IonLabel>
                  <IonInput value={form.email} onIonChange={(e) => handleInputChange(e, 'email')} />
                </IonItem>
                <IonItem>
                  <IonLabel>{form.language === 'en' ? 'Nationality' : 'Nacionalidad'}</IonLabel>
                  <IonInput value={form.nationality} onIonChange={(e) => handleInputChange(e, 'nationality')} />
                </IonItem>
                <IonItem>
                  <IonLabel>{form.language === 'en' ? 'Category' : 'Categoría'}</IonLabel>
                  <IonInput value={form.category} onIonChange={(e) => handleInputChange(e, 'category')} />
                </IonItem>
                <IonItem>
                  <IonLabel>{form.language === 'en' ? 'Boat Brand' : 'Marca del Bote'}</IonLabel>
                  <IonInput value={form.boatBrand} onIonChange={(e) => handleInputChange(e, 'boatBrand')} />
                </IonItem>
                <IonItem>
                  <IonLabel>{form.language === 'en' ? 'Boat Color' : 'Color del Bote'}</IonLabel>
                  <IonInput value={form.boatColor} onIonChange={(e) => handleInputChange(e, 'boatColor')} />
                </IonItem>
                <IonItem>
                  <IonLabel>{form.language === 'en' ? 'Boat Size' : 'Tamaño del Bote'}</IonLabel>
                  <IonInput value={form.boatSize} onIonChange={(e) => handleInputChange(e, 'boatSize')} />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>{form.language === 'en' ? 'Crew Size' : 'Tamaño de la Tripulación'}</IonLabel>
                  <IonInput
                    type="number"
                    value={form.crewSize.toString()}
                    onIonChange={(e) => handleSelectChange(e, 'crewSize')}
                  />
                </IonItem>
                <IonList>
                  {form.crew.map((member, index) => (
                    <div key={index} className="crew-member">
                      <IonItem>
                        <IonLabel>{form.language === 'en' ? 'Crew Name' : 'Nombre de la Tripulación'}</IonLabel>
                        <IonInput value={member.name} onIonChange={(e) => handleCrewChange(index, e, 'name')} />
                      </IonItem>
                      <IonItem>
                        <IonLabel>{form.language === 'en' ? 'Crew Age' : 'Edad de la Tripulación'}</IonLabel>
                        <IonInput value={member.age} onIonChange={(e) => handleCrewChange(index, e, 'age')} />
                      </IonItem>
                      <IonItem>
                        <IonLabel>{form.language === 'en' ? 'Crew Phone' : 'Teléfono de la Tripulación'}</IonLabel>
                        <IonInput value={member.phone} onIonChange={(e) => handleCrewChange(index, e, 'phone')} />
                      </IonItem>
                      <IonItem>
                        <IonLabel>{form.language === 'en' ? 'Crew Nationality' : 'Nacionalidad de la Tripulación'}</IonLabel>
                        <IonInput value={member.nationality} onIonChange={(e) => handleCrewChange(index, e, 'nationality')} />
                      </IonItem>
                    </div>
                  ))}
                </IonList>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>{form.language === 'en' ? 'Number of Kids' : 'Número de Niños'}</IonLabel>
                  <IonInput
                    type="number"
                    value={form.kidCount.toString()}
                    onIonChange={(e) => handleSelectChange(e, 'kidCount')}
                  />
                </IonItem>
                <IonList>
                  {form.kids.map((kid, index) => (
                    <div key={index} className="kid-member">
                      <IonItem>
                        <IonLabel>{form.language === 'en' ? 'Kid Name' : 'Nombre del Niño'}</IonLabel>
                        <IonInput value={kid.name} onIonChange={(e) => handleKidsChange(index, e, 'name')} />
                      </IonItem>
                      <IonItem>
                        <IonLabel>{form.language === 'en' ? 'Kid Age' : 'Edad del Niño'}</IonLabel>
                        <IonInput value={kid.age} onIonChange={(e) => handleKidsChange(index, e, 'age')} />
                      </IonItem>
                      <IonItem>
                        <IonLabel>{form.language === 'en' ? 'Kid Gender' : 'Género del Niño'}</IonLabel>
                        <IonInput value={kid.gender} onIonChange={(e) => handleKidsChange(index, e, 'gender')} />
                      </IonItem>
                    </div>
                  ))}
                </IonList>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton expand="full" type="submit" color="success">
                  {form.language === 'en' ? 'Register' : 'Registrar'}
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default RegistrationForm;
