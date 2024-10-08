import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useSave from '../Services/useSave';
import HttpMethod from '../Enums/httpMethods'; // Ajoutez votre énumération HTTP Methods si besoin

// Validation du formulaire avec Yup
const validationSchema = Yup.object({
    title: Yup.string().required('Le titre est requis'),
    content: Yup.string().required('Le contenu est requis'),
});

const CreateArticleForm = () => {
    const { saveData, isSaving, saveError } = useSave(); // Utilisation du hook personnalisé

    return (
        <Formik
            initialValues={{ title: '', content: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    const result = await saveData('articles', values, HttpMethod.POST); // Utilisation de saveData avec POST
                    console.log('Article créé', result);
                } catch (error) {
                    console.error('Erreur lors de la création de l\'article', error);
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <label htmlFor="title">Titre</label>
                        <Field type="text" name="title" />
                        <ErrorMessage name="title" component="div" />
                    </div>

                    <div>
                        <label htmlFor="content">Contenu</label>
                        <Field as="textarea" name="content" />
                        <ErrorMessage name="content" component="div" />
                    </div>

                    {saveError && <p style={{ color: 'red' }}>Erreur: {saveError}</p>}

                    <button type="submit" disabled={isSubmitting || isSaving}>
                        {isSaving ? 'Enregistrement...' : 'Créer l\'article'}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default CreateArticleForm;
