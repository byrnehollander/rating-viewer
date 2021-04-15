import { useState } from 'react'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Slider from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import Tilty from 'react-tilty'
import './App.css'
import './Rune.css'
import cards from './cardsWithRatings.json'
import { ReactComponent as Black } from './assets/black.svg'
import { ReactComponent as Blue } from './assets/blue.svg'
import { ReactComponent as Colorless } from './assets/colorless.svg'
import { ReactComponent as Green } from './assets/green.svg'
import { ReactComponent as Red } from './assets/red.svg'
import { ReactComponent as White } from './assets/white.svg'

const Container = styled.div`
  margin: 5vw;
`

const OptionsContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
  @media only screen and (max-width: 1300px) {
    flex-direction: column;
  }
`

const FlexContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const ButtonContainer = styled.div`
  margin-top: 40px;
`

const ColorsHeader = styled.div`
  display: flex;
  align-items: end;
`

const RarityContainer = styled.div`
  margin-top: 40px;
  margin-left: 50px;
  @media only screen and (max-width: 1300px) {
    margin-left: 0px;
  }
`

const ManaCostContainer = styled.div`
  margin-left: 50px;
  margin-top: 40px;
  @media only screen and (max-width: 1300px) {
    margin-left: 0px;
  }
`

const SearchContainer = styled.div`
  margin-bottom: 40px;
`

const SearchInputAndClearButton = styled.div`
  display: flex;
`

const SliderContainer = styled.div`
  width: 300px;
  max-width: 90vw;
`

const SetIconLarge = styled.span`
  font-size: 30px;
`

/* const hasType = (card, types) => {
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
} */

const hasColor = (card, colors) => {
  if (!card.colors) {
    return false
  }
  const cardColorsArray = card.colors
  for (let i = 0; i <= cardColorsArray.length; i++) {
    if (colors.has(cardColorsArray[i])) {
      return true
    }
  }
  return false
}

const hasRarity = (card, rarities) => {
  return rarities.has(card.rarity)
}

const StyledWhiteIconButton = withStyles({
  label: {
    boxShadow: '0 0 10px 3px rgb(254 251 213 / 50%)',
    borderRadius: 100
  }
})(IconButton)

const StyledBlueIconButton = withStyles({
  label: {
    boxShadow: '0 0 10px 3px rgb(170 224 250 / 50%)',
    borderRadius: 100
  }
})(IconButton)

const StyledBlackIconButton = withStyles({
  label: {
    boxShadow: '0 0 10px 3px rgb(202 194 190 / 50%)',
    borderRadius: 100
  }
})(IconButton)

const StyledRedIconButton = withStyles({
  label: {
    boxShadow: '0 0 10px 3px rgb(249 170 143 / 50%)',
    borderRadius: 100
  }
})(IconButton)

const StyledGreenIconButton = withStyles({
  label: {
    boxShadow: '0 0 10px 3px rgb(155 211 174 / 50%)',
    borderRadius: 100
  }
})(IconButton)

const StyledColorlessIconButton = withStyles({
  label: {
    boxShadow: '0 0 10px 3px rgb(203 193 191 / 50%)',
    borderRadius: 100
  }
})(IconButton)

const SelectedRarityIconButton = withStyles({
  label: {
    padding: 10,
    boxShadow: 'inset 0 0 12px 10px rgb(255 255 255 / 15%), 0 0 5px 3px rgb(255 255 255 / 15%)',
    borderRadius: 100
  }
})(IconButton)

const TypographyShadow = styled(Typography)`
  text-shadow: 1px 2px 3px rgb(0 0 0 / 70%);
`

const UnselectedIconButton = styled(IconButton)`
  opacity: 0.4;
  :hover {
    opacity: 0.9;
  }
`

const types = new Set(['Instant'])

function App () {
  const [searchTerm, setSearchTerm] = useState('')
  const [colors, setColors] = useState(new Set(['C', 'R', 'G', 'B', 'U', 'W']))
  const [maxCMC, setMaxCMC] = useState(3)
  const [rarities, setRarities] = useState(new Set(['common', 'uncommon', 'rare', 'mythic']))

  const getMatches = (types, maxCMC, colors) => {
    if (searchTerm.length > 0) {
      return cards.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase().trim()))
    } else {
      return cards.filter(c => c.cmc === maxCMC && hasColor(c, colors) && hasRarity(c, rarities))
    }
  }

  const renderMatches = (types, maxCMC, colors) => {
    const matches = getMatches(types, maxCMC, colors)
    if (matches.length === 0) {
      return <TypographyShadow variant='h6' gutterBottom>No cards match your filters</TypographyShadow>
    }
    return renderMatchesByCMC(matches, maxCMC)
  }

  const renderImages = (cards) => {
    return cards.map((c, i) => {
      return (
        <div key={i}>
          <Tilty
            scale={1.05}
            max={8}
            style={{ minWidth: 330, marginRight: 20, marginBottom: 20 }}
          >
            <img src={c.image} alt={c.name} />
          </Tilty>
          <div style={{ display: 'flex', width: 310, marginLeft: 10, marginBottom: 70 }}>
            <b style={{ marginRight: 20, fontSize: 20 }}>{c.rating.toFixed(1)}</b>
            <div style={{ fontSize: 18 }}>{c.ratingDescription}</div>
          </div>
        </div>
      )
    })
  }

  const renderMatchesByCMC = (elements, CMC) => {
    const filteredCards = elements.sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => b.rating - a.rating)
    if (filteredCards.length > 0) {
      return (
        <FlexContainer>
          {renderImages(filteredCards)}
        </FlexContainer>
      )
    }
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

  const toggleRarity = (rarity) => {
    const newRarities = new Set(rarities)
    if (rarities.has(rarity)) {
      newRarities.delete(rarity)
    } else {
      newRarities.add(rarity)
    }
    setRarities(newRarities)
  }

  return (
    <Container>
      <TypographyShadow variant='h3' gutterBottom>How good is this card?</TypographyShadow>
      <OptionsContainer>
        <ButtonContainer>
          <ColorsHeader>
            <Tooltip title='All colors are selected by default' placement='top-start'>
              <TypographyShadow variant='h6' gutterBottom>COLORS</TypographyShadow>
            </Tooltip>
            {colors.size === 0
              ? (
                <Button
                  size='small'
                  variant='outlined'
                  color='default'
                  style={{ marginLeft: 20 }}
                  onClick={() => setColors(new Set(['C', 'R', 'G', 'B', 'U', 'W']))}
                >SELECT ALL
                </Button>
                )
              : (
                <Button
                  size='small'
                  variant='outlined'
                  color='default'
                  style={{ marginLeft: 20 }}
                  onClick={() => setColors(new Set())}
                >Clear
                </Button>
                )}
          </ColorsHeader>
          <Tooltip title='White' placement='bottom'>
            {colors.has('W')
              ? (
                <StyledWhiteIconButton onClick={() => toggleColor('W')} color='primary' aria-label='White Mana' component='span'>
                  <White width={50} />
                </StyledWhiteIconButton>
                )
              : (
                <UnselectedIconButton onClick={() => toggleColor('W')} color='primary' aria-label='White Mana' component='span'>
                  <White width={50} />
                </UnselectedIconButton>
                )}
          </Tooltip>
          <Tooltip title='Blue' placement='bottom'>
            {colors.has('U')
              ? (
                <StyledBlueIconButton onClick={() => toggleColor('U')} color='primary' aria-label='Blue Mana' component='span'>
                  <Blue width={50} />
                </StyledBlueIconButton>
                )
              : (
                <UnselectedIconButton onClick={() => toggleColor('U')} color='primary' aria-label='Blue Mana' component='span'>
                  <Blue width={50} />
                </UnselectedIconButton>
                )}
          </Tooltip>
          <Tooltip title='Black' placement='bottom'>
            {colors.has('B')
              ? (
                <StyledBlackIconButton onClick={() => toggleColor('B')} color='primary' aria-label='Black Mana' component='span'>
                  <Black width={50} />
                </StyledBlackIconButton>
                )
              : (
                <UnselectedIconButton onClick={() => toggleColor('B')} color='primary' aria-label='Black Mana' component='span'>
                  <Black width={50} />
                </UnselectedIconButton>
                )}
          </Tooltip>
          <Tooltip title='Red' placement='bottom'>
            {colors.has('R')
              ? (
                <StyledRedIconButton onClick={() => toggleColor('R')} color='primary' aria-label='Red Mana' component='span'>
                  <Red width={50} />
                </StyledRedIconButton>
                )
              : (
                <UnselectedIconButton onClick={() => toggleColor('R')} color='primary' aria-label='Red Mana' component='span'>
                  <Red width={50} />
                </UnselectedIconButton>
                )}
          </Tooltip>
          <Tooltip title='Green' placement='bottom'>
            {colors.has('G')
              ? (
                <StyledGreenIconButton onClick={() => toggleColor('G')} color='primary' aria-label='Green Mana' component='span'>
                  <Green width={50} />
                </StyledGreenIconButton>
                )
              : (
                <UnselectedIconButton onClick={() => toggleColor('G')} color='primary' aria-label='Green Mana' component='span'>
                  <Green width={50} />
                </UnselectedIconButton>
                )}
          </Tooltip>
          <Tooltip title='Colorless' placement='bottom'>
            {colors.has('C')
              ? (
                <StyledColorlessIconButton onClick={() => toggleColor('C')} color='primary' aria-label='Colorless Mana' component='span'>
                  <Colorless width={50} />
                </StyledColorlessIconButton>
                )
              : (
                <UnselectedIconButton onClick={() => toggleColor('C')} color='primary' aria-label='Colorless Mana' component='span'>
                  <Colorless width={50} />
                </UnselectedIconButton>
                )}
          </Tooltip>
        </ButtonContainer>
        <RarityContainer>
          <ColorsHeader>
            <Tooltip title='All rarities are selected by default' placement='top-start'>
              <TypographyShadow variant='h6' gutterBottom>RARITIES</TypographyShadow>
            </Tooltip>
            {rarities.size === 0
              ? (
                <Button
                  size='small'
                  variant='outlined'
                  color='default'
                  style={{ marginLeft: 20 }}
                  onClick={() => setRarities(new Set(['common', 'uncommon', 'rare', 'mythic']))}
                >SELECT ALL
                </Button>
                )
              : (
                <Button
                  size='small'
                  variant='outlined'
                  color='default'
                  style={{ marginLeft: 20 }}
                  onClick={() => setRarities(new Set())}
                >Clear
                </Button>
                )}
          </ColorsHeader>
          <Tooltip title='Common' placement='bottom'>
            {rarities.has('common')
              ? (
                <SelectedRarityIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('common')} color='primary' aria-label='Common Cards' component='span'>
                  <SetIconLarge className='ss ss-common ss-grad ss-stx' />
                </SelectedRarityIconButton>
                )
              : (
                <UnselectedIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('common')} color='primary' aria-label='Common Cards' component='span'>
                  <SetIconLarge className='ss ss-common ss-grad ss-stx' />
                </UnselectedIconButton>
                )}
          </Tooltip>
          <Tooltip title='Uncommon' placement='bottom'>
            {rarities.has('uncommon')
              ? (
                <SelectedRarityIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('uncommon')} color='primary' aria-label='Uncommon Cards' component='span'>
                  <SetIconLarge className='ss ss-uncommon ss-grad ss-stx' />
                </SelectedRarityIconButton>
                )
              : (
                <UnselectedIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('uncommon')} color='primary' aria-label='Uncommon Cards' component='span'>
                  <SetIconLarge className='ss ss-uncommon ss-grad ss-stx' />
                </UnselectedIconButton>
                )}

          </Tooltip>
          <Tooltip title='Rare' placement='bottom'>
            {rarities.has('rare')
              ? (
                <SelectedRarityIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('rare')} color='primary' aria-label='Rare Cards' component='span'>
                  <SetIconLarge className='ss ss-rare ss-grad ss-stx' />
                </SelectedRarityIconButton>
                )
              : (
                <UnselectedIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('rare')} color='primary' aria-label='Rare Cards' component='span'>
                  <SetIconLarge className='ss ss-rare ss-grad ss-stx' />
                </UnselectedIconButton>
                )}
          </Tooltip>
          <Tooltip title='Mythic' placement='bottom'>
            {rarities.has('mythic')
              ? (
                <SelectedRarityIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('mythic')} color='primary' aria-label='Mythic Cards' component='span'>
                  <SetIconLarge className='ss ss-mythic ss-grad ss-stx' />
                </SelectedRarityIconButton>
                )
              : (
                <UnselectedIconButton style={{ width: 74, height: 74 }} onClick={() => toggleRarity('mythic')} color='primary' aria-label='Mythic Cards' component='span'>
                  <SetIconLarge className='ss ss-mythic ss-grad ss-stx' />
                </UnselectedIconButton>
                )}
          </Tooltip>
        </RarityContainer>
        <ManaCostContainer>
          <Tooltip title={'The card\'s mana value'} placement='top-start'>
            <TypographyShadow style={{ marginBottom: 38 }} variant='h6' gutterBottom>CMC</TypographyShadow>
          </Tooltip>
          <SliderContainer>
            <Slider
              defaultValue={3}
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
          </SliderContainer>
        </ManaCostContainer>
      </OptionsContainer>
      <SearchContainer>
        <SearchInputAndClearButton>
          <FormControl color='secondary' variant='outlined' style={{ width: 300 }}>
            <InputLabel style={{ color: 'white' }} htmlFor='search-input'>Search</InputLabel>
            <OutlinedInput color='secondary' id='search-input' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} label='Search' />
          </FormControl>
          <Button
            size='large'
            variant='outlined'
            color='default'
            style={{ marginLeft: 20 }}
            onClick={() => setSearchTerm('')}
          >Clear
          </Button>
        </SearchInputAndClearButton>
        <div style={{ marginLeft: 5, marginTop: 10 }}>When searching, your other filters will be ignored</div>
      </SearchContainer>
      {renderMatches(types, maxCMC, colors)}
    </Container>
  )
}

export default App
