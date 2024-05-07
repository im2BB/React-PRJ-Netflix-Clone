import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        red: string;
        black: {
            veryDark: string;
            darker: string;
            lighter: string;
            mediumdark: string;
        };
        white: {
            darker: string;
            lighter: string;
        };
    }
}