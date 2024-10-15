import { truncateText } from './index'

describe('truncateText', () => {
  it('должен возвращать тот же текст, если текст короче максимальной длины', () => {
    const text = 'Короткий текст'
    const result = truncateText(text, 20)
    expect(result).toBe(text)
  })

  it('должен возвращать тот же текст, если длина текста равна maxLength', () => {
    const text = 'Длина текста'
    const result = truncateText(text, text.length)
    expect(result).toBe(text)
  })

  it('должен обрезать текст до максимальной длины и добавить три точки', () => {
    const text = 'Очень длинный текст, который нужно обрезать'
    const result = truncateText(text, 20)
    expect(result).toBe('Очень длинный...')
  })

  it('должен обрезать текст до максимальной длины, не разбивая слова при обрезании последнего слова', () => {
    const text = 'Это более длинный текст, который следует сократить'
    const result = truncateText(text, 22)
    expect(result).toBe('Это более длинный...')
  })

  it('должен обрезать текст и добавлять многоточие, когда в тексте нет пробелов', () => {
    const text = 'Этопоследнеедлинноеслово'
    const result = truncateText(text, 20)
    expect(result).toBe('Этопоследнеедлинноес...')
  })

  it('should return ellipsis if maxLength is very small and no space is found', () => {
    const text = 'This is a test'
    const result = truncateText(text, 4)
    expect(result).toBe('This...')
  })

  it('должен возвращать многоточие, если максимальная длина очень мала и пробел не найден', () => {
    const result = truncateText('', 10)
    expect(result).toBe('')
  })

  it('должен обрабатываться случай, когда максимальная длина не указана (по умолчанию равно 180)', () => {
    const text =
      'Очень длинный текст, максимальная длина которого превышает 150 символов по умолчанию, должен быть соответствующим образом обрезан. Очень длинный текст, максимальная длина которого превышает 150 символов по умолчанию, должен быть соответствующим образом обрезан'
    const result = truncateText(text)
    expect(result.length).toBeLessThanOrEqual(213)
    expect(result.endsWith('...')).toBe(true)
  })
})
