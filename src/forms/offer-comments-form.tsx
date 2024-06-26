import { useState, FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/app-dispatch';
import {
  addCommentAction,
  resetCommentWasAddedAction,
  selectCommentWasAdded,
  selectCurrentOfferCardId,
  selectIsCommentAddingInProgress
} from '../store/offer-card-slice';

function OfferCommentsForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const id = useAppSelector(selectCurrentOfferCardId);
  const isCommentAddingInProgress = useAppSelector(selectIsCommentAddingInProgress);
  const isCommentWasAdded = useAppSelector(selectCommentWasAdded);

  function clearCommentForm() {
    setReview('');
    setRating(0);
  }

  useEffect(() => {
    if(isCommentWasAdded) {
      clearCommentForm();
      dispatch(resetCommentWasAddedAction());
    }
  }, [isCommentWasAdded, dispatch]);

  function handleRatingChange(evt: FormEvent<HTMLInputElement>) {
    const newRating = parseInt((evt.target as HTMLInputElement).value, 10);
    setRating(newRating);
  }

  function handleReviewChange(evt: FormEvent<HTMLTextAreaElement>) {
    evt.preventDefault();
    setReview(evt.currentTarget.value);
  }

  function handleFormSubmit(evt: FormEvent<HTMLButtonElement>) {
    evt.preventDefault();
    dispatch(addCommentAction({ comment: review, rating, id }));
  }

  function isFormInputsValueValid() {
    return review.length > 50 && review.length < 300 && rating;
  }

  return (
    <form className="reviews__form form" action="#" method="post">
      <fieldset style={{ borderStyle:'none' }} disabled={isCommentAddingInProgress}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          <input onChange={handleRatingChange} className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" checked={rating === 5} />
          <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input onChange={handleRatingChange} className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" checked={rating === 4} />
          <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input onChange={handleRatingChange} className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" checked={rating === 3}/>
          <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input onChange={handleRatingChange} className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" checked={rating === 2} />
          <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input onChange={handleRatingChange} className="form__rating-input visually-hidden" name="rating" value="1" id="1-stars" type="radio" checked={rating === 1} />
          <label htmlFor="1-stars" className="reviews__rating-label form__rating-label" title="terribly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </div>
        <textarea minLength={50} onChange={handleReviewChange} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={review}></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button onClick={handleFormSubmit} className="reviews__submit form__submit button" type="submit" disabled={!isFormInputsValueValid()}>Submit</button>
        </div>
      </fieldset>
    </form>
  );
}

export default OfferCommentsForm;
