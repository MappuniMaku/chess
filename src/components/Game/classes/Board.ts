import { isEqual, pickBy } from 'lodash';
import { IBackendMove, IMove, IPiecePosition } from '@/types';
import { CastlingType, Color, PieceColor, PieceType } from '@/enums';
import { isEven } from '@/utils';
import { Cell } from './Cell';
import { Piece } from './Piece';
import { Bishop, King, Knight, Pawn, Queen, Rook } from './pieces';
import {
  convertMoveToBackendMove,
  getCellIdFromPosition,
  getMoveString,
  getOppositeColor,
  getPositionFromCellId,
} from '../helpers';
import { pickPropsFromObj } from '@/helpers';

const PIECES_DICTIONARY: Record<PieceType, typeof Piece> = {
  bishop: Bishop,
  knight: Knight,
  pawn: Pawn,
  rook: Rook,
  king: King,
  queen: Queen,
};

const boardId = 'board';
const cellsContainerId = 'cells-container';
const movesLogContainerId = 'moves-log';

export class Board {
  $el: HTMLDivElement;
  $board: HTMLDivElement;
  $cellsContainer: HTMLDivElement;
  $movesLogContainer: HTMLDivElement;
  cells: Cell[];
  pieces: Piece[];
  $activePiece: Piece | null;
  pieceIdCounter: number;
  playerColor: PieceColor;
  currentlyMovingColor: PieceColor;
  movesLog: IMove[];
  onMakeMove: (move: IBackendMove) => void;

  constructor({
    $el,
    playerColor,
    onMakeMove,
  }: {
    $el: HTMLDivElement;
    playerColor: PieceColor;
    onMakeMove(move: IBackendMove): void;
  }) {
    this.$el = $el;
    this.render();
    this.$board = document.getElementById(boardId) as HTMLDivElement;
    this.$cellsContainer = document.getElementById(cellsContainerId) as HTMLDivElement;
    this.$movesLogContainer = document.getElementById(movesLogContainerId) as HTMLDivElement;
    this.cells = this.getInitialCells();
    this.renderCells();
    this.pieces = [];
    this.$activePiece = null;
    this.pieceIdCounter = 0;
    this.playerColor = playerColor;
    this.currentlyMovingColor = PieceColor.White;
    this.movesLog = [];
    this.onMakeMove = onMakeMove;
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.clearListeners = this.clearListeners.bind(this);
    this.enableMoving();
  }

  reportMove(move: IMove): void {
    this.onMakeMove(convertMoveToBackendMove(move));
  }

  enableMoving(): void {
    this.$board.addEventListener('mousedown', this.handleMouseDown);
  }

  disableMoving(): void {
    this.$board.removeEventListener('mousedown', this.handleMouseDown);
  }

  render(): void {
    const numbersArr = Array.from({ length: 8 }).map((_, index) => index + 1);
    const letters = numbersArr.map(
      (item) => `<div class="Chess__letter">${String.fromCharCode(item + 64)}</div>`,
    );
    const numbers = numbersArr.map((item) => `<div class="Chess__number">${item}</div>`);

    const html = `
      <div class="Chess__boardWrapper">
        <div class="Chess__letters">
          ${letters.join('')}
        </div>
        
        <div class="Chess__numbers">
          ${numbers.join('')}
        </div>
        
        <div class="Chess__board" id="${boardId}">
          <div class="Chess__cellsContainer" id="${cellsContainerId}"></div>
        </div>
        
        <div class="Chess__movesLog" id="${movesLogContainerId}"></div>
      </div>
  `;
    this.$el.insertAdjacentHTML('beforeend', html);
  }

  getInitialCells(): Cell[] {
    return Array.from({ length: 64 })
      .map((_, index) => {
        const row = Math.floor(index / 8) + 1;
        const col = (index % 8) + 1;
        let color: Color;

        if (isEven(row)) {
          color = isEven(col) ? Color.Light : Color.Dark;
        } else {
          color = isEven(col) ? Color.Dark : Color.Light;
        }

        return {
          id: index,
          row,
          col,
          color,
        };
      })
      .map((item) => new Cell(item));
  }

  renderCells(): void {
    this.cells.forEach((cell) => this.$cellsContainer.appendChild(cell.$el));
  }

  addOverlay(): void {
    this.$el.classList.add('Chess__boardWrapper--withOverlay');
  }

  removeOverlay(): void {
    this.$el.classList.remove('Chess__boardWrapper--withOverlay');
  }

  addPiece(pieceType: PieceType, color: PieceColor, position: IPiecePosition): void {
    const TargetPiece = PIECES_DICTIONARY[pieceType];
    const piece = new TargetPiece({
      color,
      position,
      cellId: getCellIdFromPosition(position),
      id: this.pieceIdCounter,
      pieces: this.pieces,
      movesLog: this.movesLog,
      type: pieceType,
      hasMadeAnyMoves: false,
    });
    this.pieceIdCounter += 1;
    this.pieces.push(piece);
    this.$board.appendChild(piece.$el);
  }

  removePiece(piece: Piece): void {
    const targetPieceIndex = this.pieces.findIndex((item) => item.id === piece.id);
    if (targetPieceIndex === -1) {
      throw new Error(`removePiece(): Cannot find piece with id ${piece.id}`);
    }
    this.pieces.splice(targetPieceIndex, 1);
    this.$board.removeChild(piece.$el);
  }

  movePiece(id: number, position: IPiecePosition): void {
    const targetPiece = this.pieces.find((item) => item.id === id);
    if (targetPiece === undefined) {
      throw new Error('movePiece(): Piece object with target ID not found');
    }
    targetPiece.setPosition(position);
  }

  handleMouseDown(event: MouseEvent): void {
    const piece = event.target as HTMLImageElement;
    if (piece === null) {
      return;
    }
    const { pieceId } = piece.dataset;
    if (pieceId === undefined) {
      return;
    }
    const activePiece = this.pieces.find((item) => item.id === Number(pieceId));
    if (activePiece === undefined) {
      throw new Error('handleMouseDown(): Active piece not found');
    }

    this.$activePiece = activePiece;

    this.showAvailableCells();
    this.$board.style.cursor = 'grabbing';
    activePiece.addActivePieceClassName();
    this.pieces.forEach((p) => {
      p.disablePointerEvents();
    });

    this.$board.addEventListener('mouseup', this.handleMouseUp);
    this.$board.addEventListener('mousemove', this.handleMouseMove);
    this.$board.addEventListener('mouseleave', this.handleMouseLeave);
  }

  handleMouseLeave(): void {
    if (this.$activePiece === null) {
      throw new Error('handleMouseLeave(): Active piece is null');
    }
    const { id, position } = this.$activePiece;
    this.movePiece(id, position);
    this.clearActivePiece();
    this.clearAvailableCells();
    this.clearListeners();
  }

  handleMouseMove(mousemoveEvent: MouseEvent): void {
    const { offsetLeft, offsetTop } = this.$board;
    if (this.$activePiece === null) {
      throw new Error('handleMouseMove(): Active piece is null');
    }
    const { $el: activePieceElement } = this.$activePiece;
    const { offsetWidth, offsetHeight } = activePieceElement;
    const { pageX, pageY } = mousemoveEvent;
    activePieceElement.style.left = `${pageX - offsetLeft - offsetWidth / 2}px`;
    activePieceElement.style.top = `${pageY - offsetTop - offsetHeight / 2}px`;
  }

  handleMouseUp(mouseupEvent: MouseEvent): void {
    const mouseupTarget = mouseupEvent.target as HTMLElement;
    if (mouseupTarget === null) {
      throw new Error('handleMouseUp(): Mouseup target is null');
    }
    const { row, column } = mouseupTarget.dataset;
    if (row === undefined || column === undefined) {
      throw new Error('handleMouseUp(): Mouseup target is not a cell');
    }
    const targetRow = Number(row);
    const targetCol = Number(column);
    const targetPosition: IPiecePosition = {
      row: targetRow,
      col: targetCol,
    };

    if (this.$activePiece === null) {
      throw new Error('handleMouseUp(): Active piece is null');
    }

    this.makeMoveIfPossible({ activePiece: this.$activePiece, targetPosition });

    this.clearActivePiece();
    this.clearAvailableCells();
    this.clearListeners();
  }

  makeMoveIfPossible({
    activePiece,
    targetPosition,
    newPieceType,
    isFromMovesLog,
  }: {
    activePiece: Piece;
    targetPosition: IPiecePosition;
    newPieceType?: PieceType;
    isFromMovesLog?: boolean;
  }): void {
    const { id: pieceId, position: startingPosition, type: activePieceType } = activePiece;
    const { row: targetRow, col: targetCol } = targetPosition;

    const targetCellId = getCellIdFromPosition(targetPosition);

    const isMoveAvailable =
      isFromMovesLog ||
      activePiece.getValidMoves(this.playerColor, this.currentlyMovingColor).includes(targetCellId);

    if (!isMoveAvailable) {
      this.movePiece(pieceId, startingPosition);
      this.clearActivePiece();
      this.clearAvailableCells();
      this.clearListeners();
      return;
    }

    let castlingType: CastlingType | undefined;
    if (activePieceType === PieceType.King) {
      const { king } = activePiece.getKingInfo();
      if (king.getPossibleCastles().includes(targetCellId)) {
        const {
          rook,
          targetPosition,
          castlingType: kingCastlingType,
        } = king.getCastlingRook(targetCellId);
        this.movePiece(rook.id, targetPosition);
        castlingType = kingCastlingType;
      }
    }

    let wasCaptureMade = false;
    let enemyPiece = this.pieces.find(
      (piece) => piece.color !== activePiece?.color && piece.cellId === targetCellId,
    );

    // Here we check if the pawn was hit by en passant
    if (
      enemyPiece === undefined &&
      activePieceType === PieceType.Pawn &&
      targetCol !== startingPosition.col
    ) {
      enemyPiece = this.pieces.find(
        (p) => p.position.col === targetCol && p.position.row === startingPosition.row,
      );
    }

    if (enemyPiece !== undefined) {
      this.removePiece(enemyPiece);
      wasCaptureMade = true;
    }

    activePiece.hasMadeAnyMoves = true;

    const move: IMove = {
      piece: pickPropsFromObj(activePiece, ['id', 'type', 'color', 'hasMadeAnyMoves']),
      initialPosition: startingPosition,
      finalPosition: targetPosition,
      wasCaptureMade,
      castlingType,
    };

    let shouldAddMoveToLog = true;

    this.movePiece(pieceId, targetPosition);

    if (activePieceType === PieceType.Pawn && (targetRow === 1 || targetRow === 8)) {
      const cell = this.cells.find((cell) => cell.id === targetCellId);
      if (cell === undefined) {
        throw new Error(`handleMouseUp(): Cell with id ${targetCellId} not found`);
      }
      if (newPieceType !== undefined) {
        this.transformPawnToPiece(move, cell.id, newPieceType, true);
      } else {
        const boundTransformPawnToPiece = this.transformPawnToPiece.bind(this, move);
        cell.addPawnTransformationState(boundTransformPawnToPiece);
        this.addOverlay();
        this.disableMoving();
        shouldAddMoveToLog = false;
      }
    }

    if (shouldAddMoveToLog) {
      this.addMoveToLog(move, isFromMovesLog);
    }

    this.switchActiveMovingColor();
  }

  transformPawnToPiece(
    boundMove: IMove,
    cellId: number,
    newPieceType: PieceType,
    isFromMovesLog = false,
  ): void {
    const pawn = this.pieces.find((p) => p.cellId === cellId);
    if (pawn === undefined) {
      throw new Error('transformPawnToPiece(): pawn not found');
    }
    const { color } = pawn;
    this.removePiece(pawn);
    this.addPiece(newPieceType, color, boundMove.finalPosition);
    if (!isFromMovesLog) {
      this.removeOverlay();
      this.enableMoving();
    }
    this.addMoveToLog(
      {
        ...boundMove,
        selectedPieceTypeToTransform: newPieceType,
      },
      isFromMovesLog,
    );
  }

  addMoveToLog(move: IMove, isFromMovesLog = false): void {
    const pieceColor = move.piece.color;
    const enemyKing = this.pieces.find((p) => p.type === PieceType.King && p.color !== pieceColor);

    if (enemyKing === undefined) {
      throw new Error('addMoveToLog() enemy king not found');
    }

    const wasCheckMade = enemyKing.getKingCheckers().length > 0;

    this.movesLog.push({
      ...move,
      wasCheckMade,
    });
    const enemyPieces = this.pieces.filter((p) => p.color !== pieceColor);
    const enemyColor = getOppositeColor(pieceColor);
    const availableMoves = enemyPieces.flatMap((p) => p.getValidMoves(enemyColor, enemyColor));

    const lastMove = this.movesLog[this.movesLog.length - 1];

    if (availableMoves.length === 0) {
      lastMove.isMate = wasCheckMade ? true : undefined;
      lastMove.isStalemate = !wasCheckMade ? true : undefined;
      this.disableMoving();
    }
    this.renderMovesLog();

    // Report only moves made by users
    if (!isFromMovesLog) {
      this.reportMove(lastMove);
    }
  }

  renderMovesLog(): void {
    const { firstChild } = this.$movesLogContainer;
    if (firstChild !== null) {
      this.$movesLogContainer.removeChild(firstChild);
    }

    const $list = document.createElement('ol');
    $list.classList.add('Chess__movesLogList');
    this.movesLog.forEach((move, index) => {
      const $moveEl = document.createElement('span');
      $moveEl.textContent = getMoveString(move);
      if (index % 2 === 0) {
        const $listItem = document.createElement('li');
        $listItem.classList.add('Chess__movesLogListItem');
        const $listItemContentWrapper = document.createElement('span');
        $listItemContentWrapper.classList.add('Chess__movesLogListItemContentWrapper');
        $listItemContentWrapper.appendChild($moveEl);
        $listItem.appendChild($listItemContentWrapper);
        $list.appendChild($listItem);
        return;
      }
      ($list.lastChild as HTMLLIElement)?.children[0]?.appendChild($moveEl);
    });

    this.$movesLogContainer.appendChild($list);
    $list.scrollTo({ top: $list.scrollHeight });
  }

  recoverPositionFromMovesLog(movesLog: IBackendMove[]): void {
    movesLog.forEach((move) => this.addMoveFromMovesLog(move));
  }

  addMoveFromMovesLog(move: IBackendMove): void {
    const lastMove = this.movesLog[this.movesLog.length - 1] as IMove | undefined;
    // Converting move from local log to backend one and cleaning it from undefined values
    const convertedLastMove =
      lastMove !== undefined ? pickBy(convertMoveToBackendMove(lastMove)) : undefined;

    if (isEqual(move, convertedLastMove)) {
      return;
    }

    const { piece, finalPosition, selectedPieceTypeToTransform } = move;

    const activePiece = this.pieces.find((item) => item.id === piece.id);
    this.makeMoveIfPossible({
      activePiece: activePiece as Piece,
      targetPosition: finalPosition,
      newPieceType: selectedPieceTypeToTransform,
      isFromMovesLog: true,
    });
  }

  switchActiveMovingColor(): void {
    this.currentlyMovingColor = getOppositeColor(this.currentlyMovingColor);
  }

  clearListeners(): void {
    this.$board.removeEventListener('mousemove', this.handleMouseMove);
    this.$board.removeEventListener('mouseup', this.handleMouseUp);
    this.$board.removeEventListener('mouseleave', this.handleMouseLeave);
    this.pieces.forEach((p) => {
      p.enablePointerEvents();
    });
    this.$board.style.cursor = 'default';
  }

  showAvailableCells(): void {
    if (this.$activePiece === null) {
      throw new Error('showAvailableCells(): Active piece is null in showAvailableCells');
    }
    const activePiece = this.$activePiece;
    const activePiecePossibleMoves = activePiece.getValidMoves(
      this.playerColor,
      this.currentlyMovingColor,
    );
    if (activePiecePossibleMoves.length === 0 && activePiece.getKingCheckers().length > 0) {
      const kingCell = this.cells.find((cell) => cell.id === activePiece.getKingInfo().king.cellId);
      if (kingCell === undefined) {
        throw new Error('showAvailableCells(): Cannot find king cell');
      }
      kingCell.highlightCheck();
      return;
    }
    activePiecePossibleMoves.forEach((id) => {
      const cell = this.cells.find((item) => item.id === id);
      if (cell === undefined) {
        throw new Error(`showAvailableCells(): Cell with id ${id} not found`);
      }
      if (
        this.pieces.some((piece) => piece.cellId === id) ||
        (activePiece.type === PieceType.Pawn &&
          getPositionFromCellId(id).col !== activePiece.position.col)
      ) {
        cell.addAvailableHitState();
        return;
      }
      cell.addAvailableMoveState();
    });
  }

  clearAvailableCells(): void {
    this.cells.forEach((cell) => {
      cell.removeAvailableMoveState();
    });
  }

  clearActivePiece(): void {
    this.$activePiece?.removeActivePieceClassName();
    this.$activePiece = null;
  }
}
