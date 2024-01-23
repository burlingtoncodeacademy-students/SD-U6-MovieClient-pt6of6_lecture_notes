import React from 'react'
import { Button, Table } from 'reactstrap';
import { baseURL } from '../../environment';
import { useNavigate } from 'react-router-dom'

function MovieTable(props) {

    const navigate = useNavigate();

    async function deleteMovie(id) {
        const url = `${baseURL}/movies/${id}`;

        const myHeaders = new Headers();
        myHeaders.append("Authorization", props.token);

        let requestOptions = {
            headers: myHeaders,
            method: 'DELETE'
        }

        try {
            let response = await fetch(url, requestOptions);
            let data = await response.json();

            if(data) {
                props.fetchMovies();
            }
            
        } catch (err) {
            console.error(err.message)
        }

    }

    return (
        <>
            <h1>List of Movies</h1>
            <Table striped>
                <thead>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Genre
                        </th>
                        <th>
                            Rating
                        </th>
                        <th>
                            Length
                        </th>
                        <th>
                            Year Released
                        </th>
                        <th>
                            Edit / Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.movies.map(movie => (
                            <tr key={movie._id}>
                                <th scope="row">
                                    {movie.title}
                                </th>
                                <td>
                                    {movie.genre}
                                </td>
                                <td>
                                    {movie.rating}
                                </td>
                                <td>
                                    {movie.length} mins
                                </td>
                                <td>
                                    {movie.releaseYear}
                                </td>
                                <td>
                                    <Button 
                                        onClick={() => navigate(`/movie/update/${movie._id}`)}
                                        color='warning'
                                    >Edit</Button>
                                    <Button
                                        onClick={() => deleteMovie(movie._id)}
                                        color='danger'
                                    >Delete</Button>
                                </td>
                            </tr>

                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}

export default MovieTable