import axios from 'axios';

const baseUrl = "https://apitailleur-nz0e.onrender.com/";

const apiRepository = {
    // Fetch data from the server
    fetchData: async (endpoint) => {
        try {
            const response = await axios.get(baseUrl + endpoint, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': '*/*',
                },
            });
            return response.data; // axios retourne directement les données JSON
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            console.error( error.response );
            console.error( error.message);
            console.error( error.response.data );

            throw new Error( error.response.data.error);
        }
    },

    // Save data to the server with method support (POST, PUT, PATCH, DELETE)
    saveData: async (endpoint, data, method = 'POST') => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'Accept': '*/*',
        };

        try {
            // Configuration de la requête selon le type de méthode HTTP
            const config = {
                method: method,
                url: baseUrl + endpoint,
                headers: headers,
                data: method !== 'DELETE' ? data : null, // Pas de body pour DELETE
            };

            const response = await axios(config);

            console.log('Response Status:', response.status);
            console.log('Response Body:', response.data);

            return response.data; // axios gère directement les réponses JSON
        } catch (error) {
            let errorMessage;

            if (error.response) {
                // Si le serveur a retourné une réponse d'erreur
                const errorData = error.response.data;
                if (errorData.error) {
                    errorMessage = errorData.error.map(err => {
                        return `Field: ${err.path.join('.')} - ${err.message}`;
                    }).join(', ');
                } else if (errorData.message) {
                    errorMessage = errorData.message;
                } else {
                    errorMessage = 'Unknown error occurred';
                }
            } else {
                // Si l'erreur vient d'une défaillance réseau ou autre
                errorMessage = error.message;
            }

            console.error('Error:', errorMessage);
            throw new Error(errorMessage);
        }
    },
};

export default apiRepository;
