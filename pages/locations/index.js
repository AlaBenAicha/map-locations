import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import Map from '../../components/Map.js';
const Index = ({ locations }) => {
  return (
    <div className="locations-container" style={{ }}>
      <h1 style={{ margin: '5px'}}>Locations</h1>
      <Map style={{ margin: '5px'}} mapLocations={locations}/>
      <div className="grid wrapper">
        {locations.map(location => {
          return (
            <div key={location._id} style={{ margin: '5px'}}>
              <Card style={{ margin: '5px', marginTop: '10px'}}>
                <CardContent>
                    <Link href={`/locations/${location._id}`}>
                      <Typography>{location.name}</Typography>
                    </Link>
                </CardContent>
                <CardContent extra>
                  <Link href={`/locations/${location._id}`}>
                    <Button primary>View</Button>
                  </Link>
                  <Link href={`/locations/${location._id}/edit`}>
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