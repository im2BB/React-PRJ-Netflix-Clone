import { useForm } from "react-hook-form";
import {
  Link,
  useMatch,
  useNavigate,
  NavigateFunction,
} from "react-router-dom";
import { motion, useScroll, useAnimation } from "framer-motion";
import { FaSearchengin } from "react-icons/fa";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
  z-index: 1000;

  @media (max-width: 1024px) {
    padding: 15px 40px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    padding: 12px 30px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 11px;
  }
`;

const Col = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled(motion.div)`
  margin-right: 50px;
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.green.main};

  .logo-image {
    width: 45px;
    height: 45px;
    margin-right: 12px;
    object-fit: contain;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    transition: transform 0.2s ease;
    color: ${(props) => props.theme.green.main};
    font-size: 45px;
  }

  &:hover .logo-image {
    transform: scale(1.05);
  }

  .logo-text {
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  @media (max-width: 1024px) {
    margin-right: 40px;
    font-size: 22px;
    .logo-image {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      font-size: 40px;
    }
  }

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
    font-size: 20px;
    .logo-image {
      width: 35px;
      height: 35px;
      margin-right: 8px;
      font-size: 35px;
    }
  }

  @media (max-width: 480px) {
    font-size: 18px;
    .logo-image {
      width: 30px;
      height: 30px;
      margin-right: 6px;
      font-size: 30px;
    }
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -8px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.green.main};
`;

const logoVariants = {
  normal: {
    scale: 1,
  },
  active: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.3,
    },
  },
};

const Items = styled.ul`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.lighter};
  transition: color 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;

  &:hover {
    color: ${(props) => props.theme.green.main};
  }

  @media (max-width: 1024px) {
    margin-right: 15px;
  }

  @media (max-width: 768px) {
    margin-right: 10px;
    font-size: 11px;
  }

  @media (max-width: 480px) {
    margin-right: 8px;
    font-size: 10px;
  }
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
    color: ${(props) => props.theme.green.main};
  }

  @media (max-width: 1024px) {
    svg {
      height: 22px;
    }
  }

  @media (max-width: 768px) {
    svg {
      height: 20px;
    }
  }

  @media (max-width: 480px) {
    svg {
      height: 18px;
    }
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 35px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: ${(props) => props.theme.black.darker};
  border: 1px solid ${(props) => props.theme.black.lighter};
  border-radius: 20px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.green.main};
  }

  @media (max-width: 1024px) {
    font-size: 14px;
    padding: 4px 8px;
    padding-left: 30px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 3px 6px;
    padding-left: 25px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    padding: 2px 5px;
    padding-left: 20px;
  }
`;

const navVariants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "rgba(18,18,18,0.95)",
  },
};

interface IForm {
  keyword: string;
}

function Header() {
  const [serchOpen, setSerchOpen] = useState(false);
  const homeMatch = useMatch("react-PRJ2");
  const tvMatch = useMatch("tv");
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();

  const toggleSearch = () => {
    if (serchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSerchOpen((prev) => !prev);
  };

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  const navigate: NavigateFunction = useNavigate();
  const { register, handleSubmit } = useForm<IForm>();

  const onvaid = (data: IForm) => {
    navigate(`/search?keyword=${data.keyword}`);
  };

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <Col>
        <Logo variants={logoVariants} whileHover="active" initial="normal">
          <FaSearchengin className="logo-image" />
          <span className="logo-text">MovieSearch</span>
        </Logo>
        <Items>
          <Item>
            <Link to="/react-PRJ2">
              Movie {homeMatch && <Circle layoutId="circle " />}
            </Link>
          </Item>
          <Item>
            <Link to="/tv">
              Tv Shows {tvMatch && <Circle layoutId="circle " />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onvaid)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: serchOpen ? -210 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 1 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="검색어를 입력하세요"
          />
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;
