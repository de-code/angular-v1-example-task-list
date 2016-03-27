import ListHistory from "../list-history.js";

describe("ListHistory", () => {
  let listHistory;

  describe("with empty initial list", () => {
    beforeEach(() => {
      listHistory = new ListHistory();
    });

    it("should be empty", () => {
      expect(listHistory.list().toArray()).toEqual([]);
    });

    it("should return false for hasUndo", () => {
      expect(listHistory.hasUndo()).toBe(false);
    });

    it("should return false for hasRedo", () => {
      expect(listHistory.hasRedo()).toBe(false);
    });

    describe("adding an item", () => {
      beforeEach(() => {
        listHistory.push("item1");
      });

      it("should return list with added item", () => {
        expect(listHistory.list().toArray()).toEqual(["item1"]);
      });

      it("should return true for hasUndo", () => {
        expect(listHistory.hasUndo()).toBe(true);
      });

      it("should return false for hasRedo", () => {
        expect(listHistory.hasRedo()).toBe(false);
      });

      describe("and adding another item", () => {
        beforeEach(() => {
          listHistory.push("item2");
        });

        it("should return list with both items", () => {
          expect(listHistory.list().toArray()).toEqual(["item1", "item2"]);
        });

        it("should return true for hasUndo", () => {
          expect(listHistory.hasUndo()).toBe(true);
        });

        it("should return false for hasRedo", () => {
          expect(listHistory.hasRedo()).toBe(false);
        });

        describe("and calling filter", () => {
          beforeEach(() => {
            listHistory.filter(item => item !== "item1");
          });

          it("should return filtered list", () => {
            expect(listHistory.list().toArray()).toEqual(["item2"]);
          });
        });

        describe("and undo", () => {
          beforeEach(() => {
            listHistory.undo();
          });

          it("should return previous list with first item", () => {
            expect(listHistory.list().toArray()).toEqual(["item1"]);
          });

          it("should return true for hasUndo", () => {
            expect(listHistory.hasUndo()).toBe(true);
          });

          it("should return true for hasRedo", () => {
            expect(listHistory.hasRedo()).toBe(true);
          });

          describe("and adding a different item", () => {
            beforeEach(() => {
              listHistory.push("itemx");
            });

            it("should return a list with previous and new item", () => {
              expect(listHistory.list().toArray()).toEqual(["item1", "itemx"]);
            });
          });

          describe("and redo", () => {
            beforeEach(() => {
              listHistory.redo();
            });

            it("should return both items again", () => {
              expect(listHistory.list().toArray()).toEqual(["item1", "item2"]);
            });

            it("should return true for hasUndo", () => {
              expect(listHistory.hasUndo()).toBe(true);
            });

            it("should return false for hasRedo", () => {
              expect(listHistory.hasRedo()).toBe(false);
            });
          });

          describe("and undo again", () => {
            beforeEach(() => {
              listHistory.undo();
            });

            it("should return an empty list", () => {
              expect(listHistory.list().toArray()).toEqual([]);
            });

            it("should return false for hasUndo", () => {
              expect(listHistory.hasUndo()).toBe(false);
            });

            it("should return true for hasRedo", () => {
              expect(listHistory.hasRedo()).toBe(true);
            });
          });
        });
      });
    });
  });

  describe("with initial list", () => {
    beforeEach(() => {
      listHistory = new ListHistory(["item1", "item2"]);
    });

    it("should return initial items", () => {
      expect(listHistory.list().toArray()).toEqual(["item1", "item2"]);
    });

    it("should return false for hasUndo", () => {
      expect(listHistory.hasUndo()).toBe(false);
    });

    it("should return false for hasRedo", () => {
      expect(listHistory.hasRedo()).toBe(false);
    });
  });
});
