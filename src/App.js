import { useState } from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Slider from '@material-ui/core/Slider'
import './App.css'
import cards from './cards.json'
import { ReactComponent as Black } from './assets/black.svg'
import { ReactComponent as Blue } from './assets/blue.svg'
import { ReactComponent as Colorless } from './assets/colorless.svg'
import { ReactComponent as Green } from './assets/green.svg'
import { ReactComponent as Red } from './assets/red.svg'
import { ReactComponent as White } from './assets/white.svg'

const hasType = (card, types) => {
  if (!card.types) {
    return false
  }
  const cardTypesArray = card.types
  for (let i = 0; i <= cardTypesArray.length; i++) {
    if (types.has(cardTypesArray[i])) {
      return true
    }
  }
  return false
}

const hasColor = (card, colors) => {
  if (!card.colors) {
    return false
  }
  const cardColorsArray = card.colors
  colors.add('C')
  for (let i = 0; i <= cardColorsArray.length; i++) {
    if (colors.has(cardColorsArray[i])) {
      return true
    }
  }
  return false
}

function App () {
  const [types, setTypes] = useState(new Set(['Instant']))
  const [maxCMC, setMaxCMC] = useState(20)
  const [colors, setColors] = useState(new Set(['C', 'R', 'G', 'B', 'U', 'W']))

  const renderMatches = (types, maxCMC, colors) => {
    return cards.map((c, i) => {
      if (c.cmc <= maxCMC && hasType(c, types) && hasColor(c, colors)) {
        return (
          <div key={i}>{c.name}
            <img src={c.image} height={300} alt={c.name} />
          </div>
        )
      }
    })
  }

  const toggleColor = (color) => {
    const newColors = new Set(colors)
    if (colors.has(color)) {
      newColors.delete(color)
    } else {
      newColors.add(color)
    }
    setColors(newColors)
  }

  return (
    <div>
      <div>Colors: {colors}</div>
      <b>Instants</b>
      <div>
        <IconButton onClick={() => toggleColor('B')} color='primary' aria-label='Black Mana' component='span'>
          <Black width={50} />
        </IconButton>
        <IconButton onClick={() => toggleColor('U')} color='primary' aria-label='Blue Mana' component='span'>
          <Blue width={50} />
        </IconButton>
        <IconButton onClick={() => toggleColor('C')} color='primary' aria-label='Colorless Mana' component='span'>
          <Colorless width={50} />
        </IconButton>
        <IconButton onClick={() => toggleColor('G')} color='primary' aria-label='Green Mana' component='span'>
          <Green width={50} />
        </IconButton>
        <IconButton onClick={() => toggleColor('R')} color='primary' aria-label='Red Mana' component='span'>
          <Red width={50} />
        </IconButton>
        <IconButton onClick={() => toggleColor('W')} color='primary' aria-label='White Mana' component='span'>
          <White width={50} />
        </IconButton>
      </div>

      <Button variant='contained' color='primary' onClick={() => setTypes(new Set(['Instant']))}>Instant</Button>
      <Button variant='contained' color='primary' onClick={() => setTypes(new Set(['Sorcery']))}>Sorcery</Button>
      <Button variant='contained' color='primary' onClick={() => setColors(new Set(['C', 'W']))}>W</Button>
      <Slider
        defaultValue={8}
        aria-labelledby='discrete-slider-always'
        step={1}
        marks
        min={0}
        max={8}
        valueLabelDisplay='on'
        onChange={(_, v) => {
          if (v !== maxCMC) {
            setMaxCMC(v)
          }
        }}
      />
      {renderMatches(types, maxCMC, colors)}
    </div>
  )
}

export default App
