import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../assets/icon/logo.svg";
import Mastercard from "../../assets/icon/footer/mastercard.svg";
import Visa from "../../assets/icon/footer/visa.svg";
import Paypal from "../../assets/icon/footer/paypal.svg";
import Webmoney from "../../assets/icon/footer/webmoney.svg";
import Bitcoin from "../../assets/icon/footer/bitcoin.svg";
import { BsFacebook, BsReddit } from "react-icons/bs";
import * as s from "./footer.module.scss";
import "../../styles/globals.scss";

const Footer = ({ setActivePriv, setLicense }) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1200 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1199 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const openLisence = () => {
    setActivePriv((prev) => !prev);
    setLicense(true);
  };
  const openPrivPol = () => {
    setActivePriv((prev) => !prev);
    setLicense(false);
  };

  return (
    <footer className={s.background}>
      <div className="layout default">
        <div className={s.container}>
          <div>
            <Image
              src={Logo}
              alt="Logo"
              height={
                (isMobile && 70) ||
                (isTablet && 78) ||
                (isDesktopOrLaptop && 106)
              }
            />
          </div>
          {(isTablet || isDesktopOrLaptop) && (
            <div className={s.donation_container}>
              <Image src={Mastercard} alt="Mastercard"></Image>
              <Image src={Visa} alt="Visa"></Image>
              <Image src={Paypal} alt="Paypal"></Image>
              <Image src={Webmoney} alt="Webmoney"></Image>
              <Image src={Bitcoin} alt="Bitcoin"></Image>
            </div>
          )}
          <div className={s.text_container}>
            <p className={s.text}>
              @ The headsail can be masthead-rigged or fractional-rigged. On a
              masthead-rigged sloop, the forestay (on which the headsail is
              carried) attaches at the top of the mast. On a fractional-rigged
              sloop, the forestay attaches to the mast at a point below the top.
              A sloop may use a bowsprit, a spar that projects forward from the
              bow.The headsail can be masthead-rigged or fractional-rigged. On a
              masthead-rigged sloop, the forestay (on which the headsail is
              carried) attaches at the top of the mast.
            </p>
            <p className={s.text}>
              @ The headsail can be masthead-rigged or fractional-rigged. On a
              masthead-rigged sloop, the forestay (on which the headsail is
              carried) attaches at the top of the mast. On a fractional-rigged
              sloop, the forestay attaches to the mast at a point below the top.
              A sloop may use a bowsprit, a spar that projects forward from the
              bow.The headsail can be masthead-rigged or fractional-rigged. On a
              masthead-rigged sloop, the forestay (on which the headsail is
              carried) attaches at the top of the mast.
            </p>
          </div>
          <div className={s.link_social_container}>
            <div className={s.link_container}>
              <button type="button" onClick={openLisence} className={s.link}>
                License
              </button>
              <span className={s.vertical_line}>|</span>
              <button type="button" onClick={openPrivPol} className={s.link}>
                Privacy Policy
              </button>
            </div>
            <div className={s.social_container}>
              <div className={s.social_item}>
                <BsFacebook size="34" />
              </div>
              <div className={s.social_item}>
                <BsReddit size="34" />
              </div>
            </div>
          </div>
          <div className={s.copyright_container}>
            <p className={s.copyright_text}>@copyright</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
