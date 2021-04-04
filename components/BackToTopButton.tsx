import classNames from 'classnames';
import styles from 'components/BackToTopButton.module.scss';
import { useEffect, useRef, useState } from 'react';
import DivButton from 'components/DivButton';

function BackToTopButton({ isEnabled }: BackToTopButtonProps) {
    const [isVisible, setIsVisible] = useState(false);
    const previousScroll = useRef<number>(0);

    useEffect(() => {
        function handleScroll() {
            setIsVisible(!!window.scrollY && window.scrollY <= previousScroll.current);
            previousScroll.current = window.scrollY;
        }

        if (isEnabled) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isEnabled]);

    function onClick() {
        if (!isHidden) {
            window.scrollTo(0, 0);
        }
    }

    const isHidden = !isEnabled || !isVisible;
    return (
        <DivButton
            onClick={onClick}
            className={classNames(styles.root, isHidden && styles.hidden)}
        >
            Back to top
        </DivButton>
    );
}

interface BackToTopButtonProps {
    isEnabled: boolean;
}

export default BackToTopButton;
