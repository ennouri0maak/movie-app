import React from "react";
import MoviesCard from "./movieCard";
import StarsRating from "./searchRating";

const movies = [
  {
    name: "Inception",
    image:
      "http://fr.web.img3.acsta.net/c_210_280/medias/nmedia/18/72/34/14/19476654.jpg",
    year: "2010",
    rating: 3
  },
  {
    name: "Imitation Game",
    image:
      "http://fr.web.img6.acsta.net/c_215_290/o_club300a.png_0_se/pictures/15/01/09/16/14/573252.jpg",
    year: "2014",
    rating: 5
  },
  {
    name: "Lion",
    image:
      "http://fr.web.img4.acsta.net/c_210_280/pictures/17/01/25/09/36/363964.jpg",
    year: "2016",
    rating: 4
  },
  {
    name: "A STAR IS BORN",
    image:
      "http://fr.web.img6.acsta.net/c_215_290/pictures/18/09/25/14/20/0923171.jpg",
    year: "2018",
    rating: 4
  }
];

const filterMovies = (movies, searchMovie, searchRating) => {
  return movies.filter(
    el =>
      el.name.toUpperCase().indexOf(searchMovie.toUpperCase().trim()) !== -1 &&
      el.rating >= searchRating
  );
};

const filmIsValid = (movies, event) => {
  let err = [];
  let field = event.target;

  if (field.name.value.trim() === "")
    err.push("Please provide the movie's name");

  if (field.image.value.trim() === "")
    err.push("Please provide a valid URI image");

  if (field.year.value.trim() < 1895) err.push("Please provide a valid year");

  if (field.rating.value.trim() < 0 || field.rating.value.trim() > 5)
    err.push("Please provide a valid rating");

  if (
    movies.some(
      el => el.name.toUpperCase() === field.name.value.toUpperCase().trim()
    )
  )
    err.push("Movie exist");

  return err;
};
//&& el.rating == event.target.rating.value

export default class MoviesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: movies,
      searchMovie: "",
      searchRating: 0,
      error: []
    };
  }

  search = e => {
    this.setState({
      searchMovie: e.target.value
    });
  };

  addMovies = e => {
    e.preventDefault();
    if (filmIsValid(this.state.movies, e).length > 0) {
      this.setState({
        error: filmIsValid(this.state.movies, e)
      });
      return false;
    }

    this.setState({
      movies: [
        ...this.state.movies,
        {
          name: e.target.name.value,
          image: e.target.image.value,
          year: e.target.year.value,
          rating: e.target.rating.value
        }
      ],
      error: []
    });

    e.target.name.value = "";
    e.target.image.value = "";
    e.target.year.value = "";
    e.target.rating.value = "";
  };

  render() {
    return (
      <div className="movies-content container">
        <div className="search-content">
          <input
            className="input-search"
            type="text"
            placeholder="Type movie name to search"
            onChange={this.search}
          />

          <div className="search-rating">
            <small>Minimum Ratingss</small>
            <div className="stars-rating">
              <StarsRating
                getRating={rating => {
                  this.setState({
                    searchRating: rating
                  });
                }}
              />
            </div>
          </div>
          <div className="col-lg-12 d-flex justify-content-start movie-btn btn">
            <div data-toggle="modal" data-target="#exampleModal">
              <i className="fas fa-plus" /> <span>Add New Movie</span>
            </div>
          </div>
        </div>

        <div className="movies-list row">
          <MoviesCard
            movies={filterMovies(
              this.state.movies,
              this.state.searchMovie,
              this.state.searchRating
            )}
          />
        </div>
        <div className="modal fade" id="exampleModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add new movie
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.state.error.length > 0 && (
                  <ul className="error-form">
                    {this.state.error.map(el => {
                      return <li>{el}</li>;
                    })}
                  </ul>
                )}
                <form onSubmit={this.addMovies}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter movie's name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                      type="url"
                      className="form-control"
                      id="image"
                      placeholder="Enter Image URI"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <input
                      type="number"
                      className="form-control"
                      id="year"
                      min="1895"
                      placeholder="Enter the year of production"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      max="5"
                      id="rating"
                      placeholder="0"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
