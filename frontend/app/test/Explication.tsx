
//  ici c'est la page pour expliquer comment faire la liaison
//  backend facilement.

// 1. dans la racine on va commencer par remplacer l'adresse IP par
//  l'adresse de la machine backend qui envoi les donnees.
//  dans le fichier ".env.local"
//  si le frontend et le backend sont sur la meme machine, il faut 
//  remplacer plut par localhost, suivie du port sur lequel est le back


// 2.  tu vas toujour commencer par importer
import apiClient from "@/lib/api"; // 
// cette ligne car c'est elle qui contient l'adresse IP globale


// 3. ici c'est l'import de toast pour afficher des messages
//  style quand il y a un evenement 
import { toast } from "sonner";



//  4. ici voila un exemple d'utilsation reel

const loginMutation = useMutation({
    mutationFn: (credentials) => apiClient.post('/api/auth/login', credentials).then(res => res.data),
    onSuccess: (data) => {
      // 4. En cas de succès
      toast.success(`Connexion réussie ! Bienvenue`);
      localStorage.setItem('authToken', data.token); // On stocke le token
      // localStorage.setItem('authToken', data.token); // On peut garder cette ligne ou la supprimer
      Cookies.set('authToken', data.token, { expires: 7 }); // <-- 2. Stocker le token dans un cookie qui expire après 7 jours
      router.push('/dashboard'); // On redirige
    }, 
    onError: (error) => {
      // 5. En cas d'erreur
      toast.error("Échec de la connexion", {
        description: "Vérifiez votre nom d'utilisateur ou votre mot de passe.",
      });
    },
});


//  5.  ici voila un autre exemple d'utilsation reel


const createAssureMutation = useMutation({
    mutationFn: (newAssure) => apiClient.post('/api/assures', newAssure).then(res => res.data),
    onSuccess: () => {
        toast.success("Assuré créé avec succès !");
        queryClient.invalidateQueries({ queryKey: ['assures'] });
        setIsModalOpen(false);
    },
    onError: (err) => {
        toast.error("Erreur lors de la création", { description: err.message });
    },
});