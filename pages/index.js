import React, { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import Map from '../components/Map';

const Index = ({ user, locationsData, errorLoading }) => {
  const [locations, setLocations] = useState(locationsData || []);
  return (
    <div className="locations-container"  >
      <h1 style={{ margin: '5px'}}>Locations</h1>
      <Map style={{ margin: '5px'}} mapLocations={locations}/>
      <div className="grid wrapper">
        {locations?.map(location => {
          return (
            <div key={location._id} style={{ margin: '5px'}} >
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


Index.getInitialProps = async ctx => {
  try {
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/locations`, {
      headers: { Authorization: token },
      params: { pageNumber: 1 }
    });
    console.log(res.data);

    return { locationsData: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

// Index.getInitialProps = async () => {
//   const res = await fetch('http://localhost:3000/api/locations');
//   const { data } = await res.json();
//   return { locations: data}
// }

export default Index;