import React, { useState } from 'react';

interface ImageComponentProps {
    src?: string;
    alt: string;
    fallbackSrc: string;
    [key: string]: any;
}

const Image: React.FC<ImageComponentProps> = ({
    src,
    alt,
    fallbackSrc,
    ...props
}) => {
    const [currentSrc, setCurrentSrc] = useState(src);

    const handleError = () => {
        setCurrentSrc(fallbackSrc);
    };

    return (
        <img
            src={currentSrc ?? fallbackSrc}
            alt={alt}
            onError={handleError}
            className="max-w-sm rounded-lg shadow-md"
            {...props}
        />
    );
};

export default Image;
