import { useEffect } from 'react';
import styles from 'hooks/useBackgroundImage.module.scss';

const imageStyles = 'linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)),'
    + ' linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5))';

function useBackgroundImage(imageUrl?: string) {
    useEffect(() => {
        let backgroundElement: HTMLDivElement;
        if (imageUrl) {
            backgroundElement = document.createElement('div');
            backgroundElement.classList.add(styles.root);
            backgroundElement.style.backgroundImage = `${imageStyles}, url(${imageUrl})`;
            document.body.appendChild(backgroundElement);
        }

        return () => {
            backgroundElement?.remove();
        };
    }, [imageUrl]);
}

export default useBackgroundImage;
