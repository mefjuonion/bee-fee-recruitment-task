import InputManager from 'src/managers/InputManager';

const getDirectionFromKeyboard = (input: InputManager): Coordinates2D => {
  const direction = { x: 0, y: 0 };

  if (input.isPressed('ArrowLeft')) direction.x -= 1;
  if (input.isPressed('ArrowRight')) direction.x += 1;
  if (input.isPressed('ArrowUp')) direction.y -= 1;
  if (input.isPressed('ArrowDown')) direction.y += 1;

  return direction;
};

export default getDirectionFromKeyboard;