import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { StyleFunctionProps } from '@chakra-ui/styled-system'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    darkAlpha: '#393939',
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        // bg: mode('#fdfdfd', '#1a202c')(props),
        bg: mode('#f9f9f9', '#2d2d2d')(props),
      },
    }),
  },

  fonts: {
    heading: 'Raleway',
    body: 'Inter',
  },
})

export default theme
