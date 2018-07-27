export function at<TElement>(source: Iterable<TElement>, index: number): TElement {
  return index >= 0 ?
    fromFront(source, index) :
    fromBack(source, -index);
}

function fromFront<TElement>(source: Iterable<TElement>, index: number): TElement {
  let n = index;

  for (const element of source) {
    if (!n--) {
      return element;
    }
  }

  return undefined;
}

function fromBack<TElement>(source: Iterable<TElement>, index: number): TElement {
  const buffer: TElement[] = [];

  for (const element of source) {
    buffer.push(element);

    if (buffer.length > index) {
      buffer.shift();
    }
  }

  return buffer.length === index ? buffer[0] : undefined;
}
