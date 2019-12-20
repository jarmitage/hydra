## Audio

Functions for manipulating audio signals.

- [hide](#hide)
- [fft](#fft)
- [setBins](#setbins)
- [setCutoff](#setcutoff)
- [setScale](#setScale)
- [setSmooth](#setSmooth)
- [show](#show)

### hide

`.hide()`

Hide audio fft

#### Example

```javascript
a.hide()
```

### fft

`.fft[ index ]`

* `index` :: integer

The index corresponds to which frequency band to use. 0 corresponds to low frequency and higher numbers correspond to higher frequency bands.

#### Example

```javascript
shape(5, () => a.fft[0]).out()

shape(5, () => a.fft[2]).out()

shape(5, () => 0.5 + a.fft[0])
  .scale(0.5, ()=> 0.5 + a.fft[2])
  .out()
```

### setBins

`.setBins( bins )`

* `bins` :: integer (default `x`)

Set number of frequency ranges to detect

#### Example

```javascript

```

### setCutoff

`.setCutoff( frequency )`

* `frequency` :: float (default `x`)

Change cutoff for sound detection

#### Example

```javascript

```

### setScale

`.setScale( amount )`

* `amount` :: float (default `x`) 

Change the range of values detected

#### Example

```javascript

```

### setSmooth

`.setSmooth( amount )`

* `amount` :: float (default `x`)

Smooth the `fft` values (make more or less sensitive to rapid changes).
Values are between 0 and 1. 0 is most senstive 1 is most smooth.

#### Example

```javascript
a.setSmooth(0.9)

a.setSmooth(0.1)
```

### show

`.show()`

Hide audio fft

#### Example

```javascript
a.show()
```