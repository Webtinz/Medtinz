const Subscription = require('../Models/Subscription');

// Ajouter un nouvel abonnement
exports.addSubscription = async (req, res) => {
    try {
        const { 
            name, description, duration, features, price, description_fr, features_fr 
        } = req.body;

        // Validation simple des champs requis
        if (!name || !description || !price || !duration) {
            return res.status(400).json({ error: 'Name, description, price, and duration are required.' });
        }

        // S'assurer que 'features' et 'features_fr' sont toujours des tableaux
        let featuresArray = Array.isArray(features) ? features : (features ? [features] : []);
        let featuresFrArray = Array.isArray(features_fr) ? features_fr : (features_fr ? [features_fr] : []);

        // Créer un nouvel abonnement
        const subscription = new Subscription({
            name,
            description,
            duration,
            features: featuresArray,  // Utilisation du tableau de features
            price,
            description_fr,  // Description en français
            features_fr: featuresFrArray,  // Tableau de features en français
        });

        // Sauvegarder l'abonnement dans la base de données
        await subscription.save();

        // Retourner la réponse
        res.status(201).json({
            message: 'Subscription added successfully',
            subscription,
        });
    } catch (error) {
        // Gestion des erreurs avec message détaillé
        res.status(400).json({ error: error.message || 'Error occurred while adding the subscription.' });
    }
};


// Récupérer tous les abonnements
exports.getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un abonnement par ID
exports.getSubscriptionById = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        res.status(200).json(subscription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un abonnement existant
exports.updateSubscription = async (req, res) => {
    try {
        const { name, description, duration, features, price, description_fr, features_fr } = req.body;

        const subscription = await Subscription.findByIdAndUpdate(
            req.params.id,  // ID de l'abonnement à mettre à jour
            { 
                name,
                description,
                duration,
                features,
                price,
                setupfee,
                description_fr,
                features_fr
            },  // Nouveaux champs à mettre à jour
            { new: true }  // Retourner le document mis à jour
        );

        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        res.status(200).json({
            message: 'Subscription updated successfully',
            subscription,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Supprimer un abonnement
exports.deleteSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.id);

        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        res.status(200).json({
            message: 'Subscription deleted successfully',
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
