import { Color, PieceColor, PieceType } from '@/enums';
import { setPieceElementProperties } from '../helpers';

interface ICellProps {
  id: number;
  row: number;
  col: number;
  color: Color;
}

export class Cell {
  id: number;
  row: number;
  col: number;
  color: Color;
  $el: HTMLDivElement;

  constructor(props: ICellProps) {
    const { id, row, col, color } = props;
    this.id = id;
    this.row = row;
    this.col = col;
    this.color = color;
    this.$el = this.getElement();
  }

  private getElement(): HTMLDivElement {
    const el = document.createElement('div');
    el.dataset.cell = String(this.id);
    el.dataset.row = String(this.row);
    el.dataset.column = String(this.col);
    el.classList.add('Chess__cell', `Chess__cell--${this.color}`);
    if (this.row === 1) {
      el.classList.add('Chess__cell--blackFirstRow');
    }
    if (this.row === 8) {
      el.classList.add('Chess__cell--whiteFirstRow');
    }
    return el;
  }

  addAvailableMoveState(): void {
    this.$el.classList.add('Chess__cell--availableMove');
  }

  addAvailableHitState(): void {
    this.$el.classList.add('Chess__cell--availableHit');
  }

  removeAvailableMoveState(): void {
    this.$el.classList.remove('Chess__cell--availableMove');
    this.$el.classList.remove('Chess__cell--availableHit');
  }

  highlightCheck(): void {
    this.$el.classList.remove('Chess__cell--checked');
    this.$el.classList.add('Chess__cell--checked');
    setTimeout(() => {
      this.$el.classList.remove('Chess__cell--checked');
    }, 600);
  }

  getTransformationOptionsElement(
    color: PieceColor,
    transformPawnToPieceFunction: (cellId: number, newPieceType: PieceType) => void,
  ): HTMLDivElement {
    const $el = document.createElement('div');
    $el.classList.add('Chess__transformationElement');

    const $queenWrapper = document.createElement('div');
    $queenWrapper.onclick = () => {
      transformPawnToPieceFunction(this.id, PieceType.Queen);
      this.removePawnTransformationState();
    };
    const $queen = document.createElement('img');
    setPieceElementProperties($queen, PieceType.Queen, color);
    $queenWrapper.appendChild($queen);

    const $rookWrapper = document.createElement('div');
    $rookWrapper.onclick = () => {
      transformPawnToPieceFunction(this.id, PieceType.Rook);
      this.removePawnTransformationState();
    };
    const $rook = document.createElement('img');
    setPieceElementProperties($rook, PieceType.Rook, color);
    $rookWrapper.appendChild($rook);

    const $bishopWrapper = document.createElement('div');
    $bishopWrapper.onclick = () => {
      transformPawnToPieceFunction(this.id, PieceType.Bishop);
      this.removePawnTransformationState();
    };
    const $bishop = document.createElement('img');
    setPieceElementProperties($bishop, PieceType.Bishop, color);
    $bishopWrapper.appendChild($bishop);

    const $knightWrapper = document.createElement('div');
    $knightWrapper.onclick = () => {
      transformPawnToPieceFunction(this.id, PieceType.Knight);
      this.removePawnTransformationState();
    };
    const $knight = document.createElement('img');
    setPieceElementProperties($knight, PieceType.Knight, color);
    $knightWrapper.appendChild($knight);

    [$queenWrapper, $rookWrapper, $bishopWrapper, $knightWrapper].forEach((item) => {
      item.classList.add('Chess__transformationElementPiece');
      $el.appendChild(item);
    });

    return $el;
  }

  addPawnTransformationState(
    transformPawnToPieceFunction: (cellId: number, newPieceType: PieceType) => void,
  ): void {
    if (this.row === 8) {
      this.$el.appendChild(
        this.getTransformationOptionsElement(PieceColor.Black, transformPawnToPieceFunction),
      );
    }
    if (this.row === 1) {
      this.$el.appendChild(
        this.getTransformationOptionsElement(PieceColor.White, transformPawnToPieceFunction),
      );
    }
  }

  removePawnTransformationState(): void {
    const $transformationStateElement = this.$el.firstChild;
    if ($transformationStateElement === null) {
      throw new Error('removePawnTransformationState(): firstChild is null');
    }
    this.$el.removeChild($transformationStateElement);
  }
}
