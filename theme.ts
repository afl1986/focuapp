import { DEFAULT_THEME, createTheme } from '@mantine/core'
import { GeistSans } from 'geist/font/sans'

export const theme = createTheme({
  fontFamily: GeistSans.style.fontFamily,
  primaryColor: 'violet',
  colors: {
    'main-black': [
      '#bcbcc8',
      '#a5a5b6',
      '#8f8fa3',
      '#787891',
      '#65657b',
      '#535365',
      '#40404f',
      '#2e2e38',
      '#1c1c22',
      '#09090b',
    ],
  },
  headings: {
    fontFamily: `${GeistSans.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
  },
  components: {},
})
