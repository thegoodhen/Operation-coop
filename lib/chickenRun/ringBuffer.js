class RingBuffer {
  constructor(size) {
    this.buffer = new Array(size);
    this.writeIndex = 0;
    this.readIndex = 0;
    this.size = size;
    this.count = 0;
  }

  write(data) {
    this.buffer[this.writeIndex] = data;
    this.writeIndex = (this.writeIndex + 1) % this.size;
    if (this.count < this.size) {
      this.count++;
    } else {
      this.readIndex = (this.readIndex + 1) % this.size;
    }
  }

  read() {
    if (this.count === 0) {
      return undefined;
    }
    const data = this.buffer[this.readIndex];
    this.readIndex = (this.readIndex + 1) % this.size;
    this.count--;
    return data;
  }
}
