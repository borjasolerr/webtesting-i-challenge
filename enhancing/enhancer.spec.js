const enhancer = require('./enhancer.js');
const { succeed, fail, repair, get } = enhancer;

const defaultItem = {
  name: 'Rusty Sword',
  durability: 50,
  enhancement: 5
};

const maxEnhancedItem = {
  name: 'Mega Sword',
  durability: 50,
  enhancement: 20
};

describe('enhancers', () => {
  describe('throw error if item is missing name/durability/enhancement or has wrong data type', () => {
    const missingDurability = {
      name: 'Lazy Sword',
      enhancement: 0
    };

    const missingName = {
      enhancement: 0
    };

    const missingEnhancement = {
      name: 'Lazy Sword'
    };

    it('repair throw', () => {
      expect(() => repair(missingDurability)).toThrow();
      expect(() => repair(missingName)).toThrow();
      expect(() => repair(missingEnhancement)).toThrow();
    });
    it('succeed throw', () => {
      expect(() => succeed(missingDurability)).toThrow();
    });
    it('fail throw', () => {
      expect(() => fail(missingDurability)).toThrow();
    });
    it('get throw', () => {
      expect(() => get(missingDurability)).toThrow();
    });
  });

  describe('throw error if item name is shorter than 3 chars', () => {
    const shortName = {
      name: 'A',
      durability: 50,
      enhancement: 20
    };
    it('repair throw', () => {
      expect(() => repair(shortName)).toThrow();
    });
    it('succeed throw', () => {
      expect(() => succeed(shortName)).toThrow();
    });
    it('fail throw', () => {
      expect(() => fail(shortName)).toThrow();
    });
    it('get throw', () => {
      expect(() => get(shortName)).toThrow();
    });
  });

  describe('repair item', () => {
    it('returns new item with 100 durability', () => {
      expect(repair(defaultItem)).toHaveProperty('durability', 100);
    });
  });

  describe('succesfully enhance item', () => {
    it('increases enhancement level by 1', () => {
      const increasedEnhancement = defaultItem.enhancement + 1;
      expect(succeed(defaultItem)).toHaveProperty('enhancement', increasedEnhancement);
    });

    it('should not enhance above 20', () => {
      expect(succeed(maxEnhancedItem)).toHaveProperty('enhancement', 20);
    });
  });

  describe('failed item enhancement', () => {
    it('decrease durability by 5, when enh < 15', () => {
      const decreasedDurability = defaultItem.durability - 5;
      expect(fail(defaultItem)).toHaveProperty('durability', decreasedDurability);
    });

    it('decrease durability by 10, when enh >= 15', () => {
      const decreasedDurability = maxEnhancedItem.durability - 10;
      expect(fail(maxEnhancedItem)).toHaveProperty('durability', decreasedDurability);
    });

    it('decrease enhancement by 1, when enh > 16', () => {
      const decreasedEnhancement = maxEnhancedItem.enhancement - 1;
      expect(fail(maxEnhancedItem)).toHaveProperty('enhancement', decreasedEnhancement);
    });
  });

  describe('modify the item name with get()', () => {
    const terribleSword = {
      name: 'Terrible Sword',
      durability: 50,
      enhancement: 0
    };

    it('do not change name if enhancement = 0', () => {
      expect(get(terribleSword)).toHaveProperty('name', terribleSword.name);
    });

    it('changes name for enhanced item', () => {
      const enhancedName = `[+${maxEnhancedItem.enhancement}] ${maxEnhancedItem.name}`;
      expect(get(maxEnhancedItem)).toHaveProperty('name', enhancedName);
    });
  });
});
