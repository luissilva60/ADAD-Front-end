import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function MovieCard(props) {
  return (
    <Card style={{ width: '18rem' }} className="mb-3">
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          Year: {props.year || props.ano}
        </Card.Text>
        <Card.Text>
          Genres: {props.genres}
        </Card.Text>
        <Card.Text>
          Average Score: {props.avgScore}
        </Card.Text>
        <Button href={"/movie/" + props._id} variant="outline-primary">Open Movie</Button>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;