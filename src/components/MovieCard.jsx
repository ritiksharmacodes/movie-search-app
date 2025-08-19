import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from "react-router";

export default function MovieCard({ movie }) {
  return (
    <Link 
    to={{
      pathname: `/${movie.id}`
    }}>
      <Card sx={{ maxWidth: 200, borderRadius: 2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={`${movie.title}`}
          />
          <CardContent sx={{ backgroundColor: '#fdf0d5', color: '#c1121f' }}>
            <Typography gutterBottom variant="h5" component="div" sx={{ lineHeight: 1.1, fontWeight: 'bold', fontSize: '1rem' }}>{movie.title}</Typography>
            <Typography variant="body2">{movie.release_date}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
