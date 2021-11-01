import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import { 
    Button,
    ImageContainer,
    Title,
} from './styles';

type Props = RectButtonProps & {
    title: string,
    svg?: React.FC<SvgProps>
}

export const SigninSocialButton = ({ title, svg: Svg, ...rest }: Props) => {
    return (
        <Button { ...rest }>
            <ImageContainer>
                <Svg />
            </ImageContainer>
            <Title>{ title }</Title>
        </Button>
    );
}
