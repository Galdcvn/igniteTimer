import { Scroll, Timer } from 'phosphor-react'
import { HeaderContainer } from './styles'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/Ignite-logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <span>
        <img src={Logo} alt="" />
      </span>
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
