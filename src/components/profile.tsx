'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getBookings from "@/libs/getBookings";
import getUserProfile from "@/libs/getUserProfile";
import BookingCatalog from "@/components/BookingCatalog";
import { UserJson } from '../../interface';
import { BookingJson } from '../../interface';
import Link from 'next/link';
import { Button } from '@mui/material';

import styled from 'styled-components';
import { Suspense} from "react"
import { LinearProgress } from "@mui/material"
function stringToColor(name: string) {
  if (!name) return '#000'; // Return a default color if name is undefined or null
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  let initials = '';
  if (name) {
    const splitName = name.split(' ');
    if (splitName.length > 0) {
      initials += splitName[0][0];
      if (splitName.length > 1) {
        initials += splitName[1][0];
      }
    }
  }
  
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}

export default function BackgroundLetterAvatars() {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<UserJson | null>(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session && session.user.token) {
        try {
          const profile = await getUserProfile(session.user.token);
          setUserProfile(profile.data as UserJson); 
        } catch (error) {
          console.error("Error fetching user profile :", error);
        }
      }
    };

    fetchUserProfile();
  }, [session]);
  if (!userProfile){
    return (
      <Stack direction="row" spacing={2}>
        <Avatar {...stringAvatar("")} />
      </Stack>
    )
  }
  return (
    <Stack direction="row" spacing={2}>
      <Avatar {...stringAvatar(userProfile.name)} />
    </Stack>
  );
}
