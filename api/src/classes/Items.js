class Items {
    async getFeatured(db) {
        try {
            throw "Not implemented yet..."
        } catch(e) {
            return response("error", e);
        }
    }

    async getItem(db, itemId) {
        try {
            throw "Not implemented yet..."
        } catch(e) {
            return response("error", e);
        }
    }

    async addItem(db, body, user) {
        try {
            if (!user || !user.id)
                throw "Unauthorized"
            throw "Not implemented yet..."
        } catch(e) {
            return response("error", e);
        }
    }
}

module.exports = Items;