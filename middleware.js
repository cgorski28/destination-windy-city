const ExpressError = require('./utils/ExpressError')
const { attractionSchema, reviewSchema } = require('./schemas');
const Attraction = require('./models/attraction.js')
const Review = require('./models/review.js')

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be authenticated to create a new attraction')
        return res.redirect('/login');
    }
    next();
}

module.exports.validateAttraction = (req, res, next) => {
    const { error } = attractionSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params
    const attraction = await Attraction.findById(id)
    if (!attraction.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/attractions/${id}`)
    }
    next();
}


module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params
    const review = await Review.findById(reviewId)
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/attractions/${id}`)
    }
    next();
}