const db = require("../db/dbConfig")


const indexReviews = async (song_id) => {
    try {
    const allReviews = await db.any(
    "SELECT * FROM reviews WHERE song_id=$1",
    song_id
    );
    return allReviews;
    } catch (err) {
    return err;
    }
}

const showReview = async (id) => {
    try {
        const oneReview = await db.one("SELECT * FROM reviews WHERE id=$1", id)
        return oneReview
    } catch (error) {
        return error
    }
}


const createReview = async (review) => {
    try {
        const newReview = await db.one("INSERT INTO reviews (reviewer, title, content, rating, song_id) VALUES($1, $2, $3, $4, $5) RETURNING *", [review.reviewer, review.title, review.content, review.rating, review.bookmark_id])
        return newReview
    } catch (error) {
        return error
    }
}


const deleteReview = async (id) => {
    try {
        const deletedReview = await db.one("DELETE FROM reviews WHERE id=$1 RETURNING *", id)
        return deletedReview
    } catch (error) {
        return error
    }
}


const updateReview = async (id, review) => {
    try {
        const updatedReview = await db.one("UPDATE reviews SET reviewer=$1, title=$2, content=$3, rating=$4 WHERE id=$5 RETURNING *", 
        [review.reviewer, review.title, review.content, review.rating, id])
        return updatedReview
    } catch (error) {
        return error
    }
}


module.exports = { indexReviews, showReview, createReview, deleteReview, updateReview }