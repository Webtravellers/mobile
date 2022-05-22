import { LocationType } from './../types/LocationTypeModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Location from '../types/LocationModel';

const locaitonSlice = createSlice({
  name: 'locations',
  initialState: {
    locations: [] as Location[],
    locationTypes: [] as LocationType[],
    filteredLocations: [] as Location[],
  },
  reducers: {
    setLocations: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload;
    },
    setLocationTypes: (state, action: PayloadAction<LocationType[]>) => {
      state.locationTypes = action.payload;
    },
    setFilterLocations: (state, action: PayloadAction<Location[]>) => {
      state.filteredLocations = action.payload;
    }
  },
});

export const {setLocations, setLocationTypes, setFilterLocations} = locaitonSlice.actions;

export default locaitonSlice.reducer;


// import { LocationService } from './../services/locationService';
// import {
//     createAsyncThunk,
//     createEntityAdapter,
//     createSlice
//   } from '@reduxjs/toolkit';
//   import { RootState } from '.';
// import Location from '../types/LocationModel';
  
// const locationService = new LocationService()

//   export const fetchLocations = createAsyncThunk('locations/fetchLocations', async () => {
//     const locations = await locationService.getAll();

//     console.log(locations.data.data.length)
//     return locations.data.data as Location[];
//   });
  
//   export const locationsAdapter = createEntityAdapter<Location>();
  
//   const locationsSlice = createSlice({
//     name: 'locations',
//     initialState: locationsAdapter.getInitialState({
//       loading: false
//     }),
//     reducers: {},
//     extraReducers: (builder) => {
//       builder.addCase(fetchLocations.pending, (state) => {
//         state.loading = true;
//       });
//       builder.addCase(fetchLocations.fulfilled, (state, action) => {
//         locationsAdapter.setAll(state, action.payload);
//         state.loading = false;
//       });
//       builder.addCase(fetchLocations.rejected, (state) => {
//         state.loading = false;
//       });
//     }
//   });
  
//   export const {
//     selectById: selectLocationById,
//     selectIds: selectLocationIds,
//     selectEntities: selectLocationEntities,
//     selectAll: selectAllLocations,
//     selectTotal: selectTotalLocations
//   } = locationsAdapter.getSelectors((state: RootState) => state.locations);
  
//   export default locationsSlice.reducer;