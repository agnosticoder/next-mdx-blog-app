import Image from 'next/image';
import logo from '../public/mdx-icon.svg';

const Logo = () => {
    return (
        <div>
            <Image src={logo} alt='Logo' width={50} height={50}/>
        </div>
    );
};

export default Logo;