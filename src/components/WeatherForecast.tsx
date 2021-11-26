import { useQuery } from 'react-query';
import { getPosition } from '../utils';
import Wrapper from './Wrapper';

type Weathertype = {
    units: string, temperature: number
}

const WeatherForecast = () => {
    const {
        data,
        isLoading,
    } = useQuery<Weathertype, Error>('weather', async () => {
        const position = await getPosition();
        const data = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${position?.coords?.latitude}&lon=${position?.coords?.longitude}`)
            .then((result) => result.json());

        const units = data?.properties?.meta?.units?.air_temperature;
        const temperature = data?.properties?.timeseries[0]?.data?.instant?.details?.air_temperature;

        return { units, temperature };

    }, {
        retry: false,
        refetchOnWindowFocus: false,
    });


    return (
        <Wrapper width="60vw" margin="1vh 1vh 1vh 3vh">
            {!isLoading && data && `Aktuální počasí ve vaší lokaci: ${data.temperature} ${data.units}`}
        </Wrapper>
    );
};

export default WeatherForecast;