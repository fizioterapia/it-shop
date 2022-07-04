class Categories {
    async getCategories(db) {
        try {
            throw "Not implemented yet..."
        } catch(e) {
            return response("error", e);
        }
    }
    
    async getItems(db, categoryId) {
        try {
            throw "Not implemented yet..."
        } catch(e) {
            return response("error", e);
        }
    }

    async addCategory(db, body, user) {
        try {
            if (!user || !user.id)
                throw "Unauthorized"
            
            throw "Not implemented yet..."
        } catch(e) {
            return response("error", e);
        }
    }
}

module.exports = Categories;