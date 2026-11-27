export type ArtistProfileForBrand = {
  artistProfileId: string;
  setArtistProfileId: (id: string) => void;
};

type ArtistProfileForBrandSetter = (partial: Partial<ArtistProfileForBrand>) => void;

export const artistProfileForBrandSlice = (
  set: ArtistProfileForBrandSetter
): ArtistProfileForBrand => ({
  artistProfileId: '',
  setArtistProfileId: (id) => set({ artistProfileId: id }),
});
