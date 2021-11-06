import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';

const Index = ({ locations }) => {
  return (
    <div className="locations-container">
      <h1>Locations</h1>
      <div className="grid wrapper">
        {locations.map(location => {
          return (
            <div key={location._id}>
              <Card>
                <CardContent>
                    <Link href={`/${location._id}`}>
                      <Typography>{location.name}</Typography>
                    </Link>
                </CardContent>
                <CardContent extra>
                  <Link href={`/${location._id}`}>
                    <Button primary>View</Button>
                  </Link>
                  <Link href={`/${location._id}/edit`}>
                    <Button primary>Edit</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/locations');
  const { data } = await res.json();
  return { locations: data}
}

export default Index;