const Content = require('../models/Content');

// Récupérer le contenu dans la langue sélectionnée
exports.getContent = async (req, res) => {
    const { lang } = req.params;  // "fr" ou "en"
    const { key } = req.query;    // Clé du contenu à récupérer

    try {
        const content = await Content.findOne({ key });

        if (!content) {
            return res.status(404).json({ message: "Contenu introuvable" });
        }

        // Récupérer le contenu dans la langue spécifiée
        let contentText;
        if (lang === 'fr') {
            contentText = content.content_fr;
        } else if (lang === 'en') {
            contentText = content.content_en;
        }

        if (!contentText) {
            return res.status(400).json({ message: `Contenu non disponible en ${lang}` });
        }

        res.json({ content: contentText });
    } catch (error) {
        console.error("Erreur lors de la récupération du contenu:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// Ajouter ou mettre à jour le contenu
exports.addOrUpdateContent = async (req, res) => {
    const { key, content_fr, content_en , pageId} = req.body;

    try {
        let content = await Content.findOne({ key });

        if (content) {
            // Mettre à jour le contenu existant
            content.content_fr = content_fr;
            content.content_en = content_en;
            content.pageId = pageId;
        } else {
            // Créer un nouveau contenu
            content = new Content({ key, content_fr, content_en , pageId });
        }

        await content.save();
        res.json({ message: "Contenu enregistré ou mis à jour avec succès" });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement du contenu:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
