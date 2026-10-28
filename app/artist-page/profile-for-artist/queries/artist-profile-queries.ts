import { useQuery } from '@tanstack/react-query';
import { getArtistProfile } from '../api/artist-profile';

export function useGetArtistProfile() {
    return useQuery({
        queryKey: ['artist_profile'],
        queryFn: getArtistProfile
    })
}
