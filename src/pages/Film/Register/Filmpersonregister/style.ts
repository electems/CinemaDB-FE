import styled from 'styled-components'

export const Film = styled.div`
  bootstrap-demo .dropdown-trigger {
    border-radius: 0.25rem;
  }

  bootstrap-demo .dropdown-trigger > span:after {
    font-size: 12px;
    color: #555;
  }

  bootstrap-demo .toggle {
    font: normal normal normal 12px/1 FontAwesome;
    color: #555;
  }

  bootstrap-demo .toggle.collapsed::after {
    content: "\f067";
  }

  bootstrap-demo .toggle.expanded::after {
    content: "\f068";
  }
  bootstrap-demo .root {
    padding: 0px;
    margin: 0px;
  }
`
