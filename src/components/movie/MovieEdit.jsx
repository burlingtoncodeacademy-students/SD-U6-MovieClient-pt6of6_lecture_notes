import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FullButton from '../buttons/FullButton'
import {
    Input, Container, Row, Col, Form, FormGroup, Label, Button
} from 'reactstrap';
import { baseURL } from '../../environment'

function MovieEdit(props) {

    const { id } = useParams();
    const [movieTitle, setMovieTitle] = useState('');
    const [movieGenre, setMovieGenre] = useState('');
    const [movieRating, setMovieRating] = useState('');
    const [movieLength, setMovieLength] = useState('');
    const [movieReleased, setMovieReleased] = useState('');
    const navigate = useNavigate()

    let ratings = [null, 'G', 'PG', 'PG-13', 'NC-17', 'R'];
    let genre = [
        null, 'Comedy', 'Drama', 'Action', 'Horror', 'Thriller', 'Family', 'Documentary'
    ];

    const yearRange = () => {
        let years = [null]
        const thisYear = new Date().getFullYear();

        for (let i = thisYear; i >= 1892; i--) years.push(i);

        return (
            <>
                <Input
                    value={movieReleased}
                    onChange={e => e.target.value}
                    type="select">
                    {
                        years.map((year, index) => (<option key={index} value={year}>{year}</option>))
                    }
                </Input>
            </>
        )
    }

    const fetchMovie = async () => {
        const url = `${baseURL}/movies/find-one/${id}`;

        const requestOptions = {
            method: "GET",
            headers: new Headers({
                "Authorization": props.token
            })
        }

        try {

            const res = await fetch(url, requestOptions);
            const data = await res.json();
            console.log(data)

            const { title, genre, length, rating, releaseYear } = data.result;

            setMovieTitle(title);
            setMovieGenre(genre);
            setMovieLength(length);
            setMovieRating(rating);
            setMovieReleased(releaseYear);

        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        if (props.token) {
            fetchMovie();
        }
    }, [props.token])

    async function handleSubmit(e) {
        e.preventDefault();

        const url = `${baseURL}/movies/${id}`;

        let bodyObj = JSON.stringify({
            title: movieTitle,
            genre: movieGenre,
            length: movieLength,
            rating: movieRating,
            releaseYear: movieReleased
        })

        const requestOptions = {
            headers: new Headers({
                "Authorization": props.token,
                "Content-Type": "application/json"
            }),
            body: bodyObj,
            method: "PATCH"
        }

        try {
            const res = await fetch(url, requestOptions);
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <h1
                style={{
                    textAlign: "center",
                    textDecoration: "underline"
                }}
            >Edit Movie</h1>
            <Container>
                <Row>
                    <Col md="4">
                        <p>
                            <b>{movieTitle}</b>
                            <br />A {movieGenre} rated {movieRating} that runs {movieLength}
                            minutes was released in {movieReleased}.
                            <br /> What needs to be changed?
                        </p>
                        <FullButton>
                            <Button 
                                color="info"
                                outline
                                onClick={() => navigate('/movie')}
                            >Back to Table</Button>
                        </FullButton>
                    </Col>
                    <Col md="8">
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input
                                    autoComplete='off'
                                    value={movieTitle}
                                    onChange={e => setMovieTitle(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Genre</Label>
                                <Input
                                    value={movieGenre}
                                    onChange={e => setMovieGenre(e.target.value)}
                                    type="select"
                                    autoComplete='off'
                                >
                                    {
                                        genre.map((g, i) => (
                                            <option
                                                key={i}
                                                value={g}
                                            >{g}</option>
                                        ))
                                    }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Rating</Label>
                                <Input
                                    value={movieRating}
                                    onChange={e => setMovieRating(e.target.value)}
                                    type="select"
                                    autoComplete='off'
                                >
                                    {
                                        ratings.map((r, i) => (
                                            <option
                                                key={i}
                                                value={r}
                                            >{r}</option>
                                        ))
                                    }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Length</Label>
                                <Input
                                    value={movieLength}
                                    onChange={e => setMovieLength(e.target.value)}
                                    type="number"
                                    autoComplete='off'
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Release Year</Label>
                                {yearRange()}
                            </FormGroup>
                            <FullButton>
                                <Button color="success">Update</Button>
                            </FullButton>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MovieEdit