/* @ds-bundle: {"format":4,"namespace":"RestockDesignSystem_25704b","components":[{"name":"Sticker","sourcePath":"components/brand/Sticker.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"PageDots","sourcePath":"components/feedback/PageDots.jsx"},{"name":"ProgressBar","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Stepper","sourcePath":"components/forms/Stepper.jsx"},{"name":"Toggle","sourcePath":"components/forms/Toggle.jsx"},{"name":"CategoryBudget","sourcePath":"components/list/CategoryBudget.jsx"},{"name":"ItemTile","sourcePath":"components/list/ItemTile.jsx"},{"name":"ShoppingItem","sourcePath":"components/list/ShoppingItem.jsx"},{"name":"TabBar","sourcePath":"components/navigation/TabBar.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"GradientCard","sourcePath":"components/surfaces/GradientCard.jsx"},{"name":"Sheet","sourcePath":"components/surfaces/Sheet.jsx"}],"sourceHashes":{"components/brand/Sticker.jsx":"9584cac537f6","components/core/Avatar.jsx":"b7089eb596c8","components/core/Badge.jsx":"83e6ceb66343","components/core/Button.jsx":"140ad105e17d","components/core/Icon.jsx":"2edc22841128","components/core/IconButton.jsx":"82cc772168d6","components/core/Tag.jsx":"f8dfefd19923","components/feedback/PageDots.jsx":"cc4ffbb5eb60","components/feedback/ProgressBar.jsx":"3544be2a8fa0","components/forms/Checkbox.jsx":"11f92dd5df92","components/forms/Input.jsx":"cabce86466ae","components/forms/Radio.jsx":"1219f2b2970e","components/forms/SegmentedControl.jsx":"c733c2c89921","components/forms/Select.jsx":"8a0299382c08","components/forms/Stepper.jsx":"2abee548dfe1","components/forms/Toggle.jsx":"233854c27fb1","components/list/CategoryBudget.jsx":"4aa1c22e0e5e","components/list/ItemTile.jsx":"cde258af01aa","components/list/ShoppingItem.jsx":"021b434ba5a1","components/navigation/TabBar.jsx":"f526905aeca6","components/surfaces/Card.jsx":"81bebd090d96","components/surfaces/GradientCard.jsx":"21bba6dd0599","components/surfaces/Sheet.jsx":"4322e26ce6f3","ui_kits/app/AddItemSheet.jsx":"0235a793c397","ui_kits/app/HomeScreen.jsx":"87c49099bf05","ui_kits/app/HouseholdScreen.jsx":"6b8af23d0687","ui_kits/app/ListScreen.jsx":"d2aba17e127b","ui_kits/app/SpendScreen.jsx":"ac02b38fb886","ui_kits/app/data.js":"f57f65c21043"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.RestockDesignSystem_25704b = window.RestockDesignSystem_25704b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
const T = {
  lavender: ['var(--lavender-300)', 'var(--dusk-900)'],
  sage: ['var(--sage-300)', 'var(--dusk-900)'],
  apricot: ['var(--apricot-300)', 'var(--dusk-900)'],
  tangerine: ['var(--tangerine-500)', 'var(--dusk-900)'],
  dusk: ['var(--dusk-500)', 'var(--cream-50)']
};
function Avatar({
  name = '',
  tone = 'lavender',
  size = 36,
  ring,
  src
}) {
  const [bg, fg] = T[tone];
  const initials = name.split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase();
  return /*#__PURE__*/React.createElement("span", {
    title: name,
    style: {
      width: size,
      height: size,
      borderRadius: 99,
      background: src ? 'url(' + src + ') center/cover' : bg,
      color: fg,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: '700 ' + Math.round(size * 0.38) + 'px/1 var(--font-display)',
      boxShadow: ring ? '0 0 0 2px var(--surface-card)' : 'none',
      flexShrink: 0
    }
  }, !src && initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const T = {
  tangerine: ['var(--tangerine-500)', 'var(--dusk-900)'],
  dusk: ['var(--dusk-500)', 'var(--cream-50)'],
  sage: ['var(--sage-500)', 'var(--cream-50)'],
  cream: ['var(--cream-50)', 'var(--dusk-900)']
};
function Badge({
  children,
  tone = 'tangerine',
  dot
}) {
  const [bg, fg] = T[tone];
  if (dot) return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 8,
      height: 8,
      borderRadius: 99,
      background: bg,
      boxShadow: '0 0 0 2px var(--surface-card)'
    }
  });
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 20,
      height: 20,
      padding: '0 6px',
      borderRadius: 99,
      background: bg,
      color: fg,
      font: '800 11px/1 var(--font-display)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Icon({
  name,
  size = 20,
  color,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("i", _extends({
    className: 'icon-' + name,
    "aria-hidden": "true",
    style: {
      fontSize: size,
      lineHeight: 1,
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: color || 'inherit',
      flexShrink: 0,
      fontStyle: 'normal',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/brand/Sticker.jsx
try { (() => {
const T = {
  tangerine: ['var(--tangerine-500)', 'var(--cream-50)', 'var(--apricot-300)'],
  apricot: ['var(--apricot-300)', 'var(--dusk-900)', 'var(--tangerine-500)'],
  sage: ['var(--sage-300)', 'var(--dusk-900)', 'var(--cream-50)'],
  lavender: ['var(--lavender-300)', 'var(--dusk-900)', 'var(--dusk-500)'],
  dusk: ['var(--dusk-500)', 'var(--cream-50)', 'var(--apricot-300)'],
  cream: ['var(--cream-50)', 'var(--dusk-900)', 'var(--tangerine-500)']
};
function burst(n, inner) {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const a = Math.PI * i / n - Math.PI / 2;
    const r = i % 2 ? inner : 50;
    pts.push((50 + r * Math.cos(a)).toFixed(2) + '% ' + (50 + r * Math.sin(a)).toFixed(2) + '%');
  }
  return 'polygon(' + pts.join(',') + ')';
}
function Sticker({
  shape = 'circle',
  tone = 'tangerine',
  top,
  main,
  bottom,
  icon,
  size = 96,
  rotate = 0,
  ring = true,
  italic,
  shadow = true
}) {
  const [bg, fg, ringC] = T[tone];
  const w = shape === 'oval' || shape === 'tag' ? Math.round(size * 1.35) : size;
  const h = size;
  const radius = shape === 'circle' || shape === 'oval' ? '50%' : shape === 'tag' ? Math.round(size * 0.16) : 0;
  const clip = shape === 'burst' ? burst(16, 44) : undefined;
  const mainSize = Math.round(size * (main && String(main).length > 5 ? 0.2 : 0.28));
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      transform: 'rotate(' + rotate + 'deg)',
      filter: shadow ? 'drop-shadow(0 2px 3px rgba(38,36,61,.18))' : 'none',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: w,
      height: h,
      borderRadius: radius,
      clipPath: clip,
      background: bg,
      color: fg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: Math.round(size * 0.03),
      textAlign: 'center',
      boxSizing: 'border-box',
      padding: Math.round(size * 0.14),
      overflow: 'hidden',
      isolation: 'isolate'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'var(--grain)',
      opacity: .35,
      mixBlendMode: 'soft-light',
      pointerEvents: 'none'
    }
  }), ring && shape !== 'burst' && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: Math.round(size * 0.06),
      borderRadius: shape === 'tag' ? Math.round(size * 0.1) : '50%',
      border: Math.max(1.5, size * 0.02) + 'px solid ' + ringC,
      opacity: .9
    }
  }), top && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      font: '800 ' + Math.round(size * 0.1) + 'px/1 var(--font-display)',
      letterSpacing: '.08em',
      textTransform: 'uppercase'
    }
  }, top), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: Math.round(size * 0.3),
    style: {
      position: 'relative'
    }
  }), main && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      font: (italic ? 'italic ' : '') + '900 ' + mainSize + 'px/0.95 var(--font-display)',
      letterSpacing: '-.03em',
      textTransform: italic ? 'none' : 'uppercase'
    }
  }, main), bottom && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      font: '700 ' + Math.round(size * 0.09) + 'px/1.1 var(--font-body)',
      letterSpacing: '.04em',
      textTransform: 'uppercase',
      opacity: .9
    }
  }, bottom)));
}
Object.assign(__ds_scope, { Sticker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Sticker.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const H = {
  sm: 'var(--control-sm)',
  md: 'var(--control-md)',
  lg: 'var(--control-lg)'
};
const PX = {
  sm: 14,
  md: 22,
  lg: 28
};
const V = {
  primary: {
    background: 'var(--action-primary)',
    color: 'var(--text-inverse)',
    border: 'var(--border-w) solid var(--action-primary)'
  },
  secondary: {
    background: 'transparent',
    color: 'var(--text-1)',
    border: 'var(--border-w) solid var(--border-strong)'
  },
  accent: {
    background: 'var(--action-accent)',
    color: 'var(--dusk-900)',
    border: 'var(--border-w) solid var(--action-accent)'
  },
  soft: {
    background: 'var(--lavender-100)',
    color: 'var(--dusk-700)',
    border: 'var(--border-w) solid transparent'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-2)',
    border: 'var(--border-w) solid transparent'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth,
  disabled,
  children,
  onClick,
  type = 'button',
  style
}) {
  const [p, setP] = React.useState(false);
  const isz = size === 'sm' ? 16 : 18;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onPointerDown: () => setP(true),
    onPointerUp: () => setP(false),
    onPointerLeave: () => setP(false),
    style: {
      ...V[variant],
      height: H[size],
      padding: '0 ' + PX[size] + 'px',
      borderRadius: 'var(--radius-pill)',
      font: size === 'sm' ? '700 13px/1 var(--font-body)' : 'var(--type-label)',
      fontSize: size === 'lg' ? 16 : undefined,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      width: fullWidth ? '100%' : undefined,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transform: p && !disabled ? 'scale(var(--press-scale))' : 'none',
      transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, iconLeft && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: isz
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: isz
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
const V = {
  secondary: {
    background: 'var(--surface-card)',
    color: 'var(--text-1)',
    border: 'var(--border-w) solid var(--border-1)'
  },
  primary: {
    background: 'var(--action-primary)',
    color: 'var(--text-inverse)',
    border: 'var(--border-w) solid var(--action-primary)'
  },
  accent: {
    background: 'var(--action-accent)',
    color: 'var(--dusk-900)',
    border: 'var(--border-w) solid var(--action-accent)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-1)',
    border: 'var(--border-w) solid transparent'
  },
  glass: {
    background: 'rgba(255,253,246,.55)',
    color: 'var(--text-1)',
    border: 'var(--border-w) solid rgba(255,253,246,.6)',
    backdropFilter: 'blur(var(--blur-glass))'
  }
};
function IconButton({
  icon,
  label,
  variant = 'secondary',
  size = 44,
  onClick,
  disabled,
  style
}) {
  const [p, setP] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": label,
    onClick: onClick,
    disabled: disabled,
    onPointerDown: () => setP(true),
    onPointerUp: () => setP(false),
    onPointerLeave: () => setP(false),
    style: {
      ...V[variant],
      width: size,
      height: size,
      borderRadius: 'var(--radius-pill)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      cursor: 'pointer',
      opacity: disabled ? 0.4 : 1,
      transform: p ? 'scale(.92)' : 'none',
      transition: 'transform var(--dur-fast) var(--ease-out)',
      flexShrink: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: Math.round(size * 0.45)
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
const T = {
  neutral: ['var(--surface-sunken)', 'var(--text-1)'],
  lavender: ['var(--lavender-100)', 'var(--dusk-700)'],
  sage: ['var(--sage-100)', 'var(--sage-700)'],
  apricot: ['var(--apricot-100)', '#8A5A12'],
  tangerine: ['var(--tangerine-100)', 'var(--tangerine-700)'],
  dusk: ['var(--dusk-500)', 'var(--cream-50)']
};
function Tag({
  children,
  tone = 'neutral',
  icon,
  selected,
  onClick,
  onRemove,
  size = 'md'
}) {
  const [bg, fg] = selected ? T.dusk : T[tone];
  const h = size === 'sm' ? 24 : 32;
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: h,
      padding: '0 ' + (size === 'sm' ? 9 : 13) + 'px',
      borderRadius: 'var(--radius-pill)',
      background: bg,
      color: fg,
      font: size === 'sm' ? '700 11px/1 var(--font-body)' : '700 13px/1 var(--font-body)',
      cursor: onClick ? 'pointer' : 'default',
      whiteSpace: 'nowrap',
      transition: 'background var(--dur-base) var(--ease-out)'
    }
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'sm' ? 12 : 14
  }), children, onRemove && /*#__PURE__*/React.createElement("span", {
    role: "button",
    "aria-label": "Remove",
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    style: {
      display: 'inline-flex',
      marginRight: -4,
      cursor: 'pointer',
      opacity: .75
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 14
  })));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/PageDots.jsx
try { (() => {
function PageDots({
  count = 3,
  active = 0,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      gap: 6,
      alignItems: 'center'
    }
  }, Array.from({
    length: count
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    onClick: () => onChange && onChange(i),
    style: {
      width: i === active ? 20 : 8,
      height: 8,
      borderRadius: 99,
      background: i === active ? 'var(--tangerine-500)' : 'var(--cream-300)',
      transition: 'width var(--dur-base) var(--ease-out)',
      cursor: onChange ? 'pointer' : 'default'
    }
  })));
}
Object.assign(__ds_scope, { PageDots });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/PageDots.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressBar.jsx
try { (() => {
const T = {
  sage: 'var(--sage-300)',
  lavender: 'var(--lavender-300)',
  apricot: 'var(--apricot-300)',
  tangerine: 'var(--tangerine-500)',
  dusk: 'var(--dusk-500)'
};
function ProgressBar({
  value = 0,
  max = 100,
  tone = 'dusk',
  height = 10,
  autoWarn = true,
  track = 'var(--surface-sunken)'
}) {
  const pct = Math.min(100, value / max * 100);
  const over = autoWarn && value > max;
  const near = autoWarn && !over && pct >= 90;
  const fill = over ? 'var(--tangerine-500)' : near ? 'var(--apricot-500)' : T[tone] || tone;
  return /*#__PURE__*/React.createElement("div", {
    role: "progressbar",
    "aria-valuenow": value,
    "aria-valuemax": max,
    style: {
      height,
      borderRadius: 99,
      background: track,
      overflow: 'hidden',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + '%',
      height: '100%',
      borderRadius: 99,
      background: fill,
      transition: 'width var(--dur-slow) var(--ease-out), background var(--dur-base)'
    }
  }));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  checked,
  onChange,
  label,
  disabled,
  size = 24
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .4 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "checkbox",
    "aria-checked": !!checked,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: size,
      height: size,
      borderRadius: Math.round(size * 0.32),
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: checked ? 'var(--sage-500)' : 'var(--surface-card)',
      border: 'var(--border-w) solid ' + (checked ? 'var(--sage-500)' : 'var(--border-2)'),
      color: 'var(--cream-50)',
      transition: 'background var(--dur-base) var(--ease-out), border-color var(--dur-base)',
      transform: checked ? 'scale(1)' : 'scale(.96)'
    }
  }, checked && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: Math.round(size * 0.66),
    style: {
      fontWeight: 700
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-1)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  placeholder,
  value,
  onChange,
  iconLeft,
  iconRight,
  prefix,
  type = 'text',
  hint,
  error,
  style
}) {
  const [f, setF] = React.useState(false);
  const bc = error ? 'var(--tangerine-500)' : f ? 'var(--dusk-500)' : 'var(--border-1)';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-2)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 'var(--control-md)',
      padding: '0 16px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)',
      border: 'var(--border-w) solid ' + bc,
      boxShadow: f ? '0 0 0 4px var(--lavender-100)' : 'none',
      transition: 'border-color var(--dur-base), box-shadow var(--dur-base)'
    }
  }, iconLeft && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: 18,
    color: "var(--text-3)"
  }), prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-strong)',
      color: 'var(--text-2)'
    }
  }, prefix), /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    placeholder: placeholder,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 0,
      outline: 0,
      background: 'transparent',
      font: 'var(--type-body)',
      color: 'var(--text-1)'
    }
  }), iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: 18,
    color: "var(--text-3)"
  })), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: error ? 'var(--tangerine-700)' : 'var(--text-3)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  checked,
  onChange,
  label,
  disabled,
  name
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .4 : 1
    },
    onClick: () => !disabled && onChange && onChange(true)
  }, /*#__PURE__*/React.createElement("span", {
    role: "radio",
    "aria-checked": !!checked,
    style: {
      width: 22,
      height: 22,
      borderRadius: 99,
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-card)',
      border: 'var(--border-w) solid ' + (checked ? 'var(--dusk-500)' : 'var(--border-2)'),
      transition: 'border-color var(--dur-base)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 99,
      background: 'var(--tangerine-500)',
      transform: checked ? 'scale(1)' : 'scale(0)',
      transition: 'transform var(--dur-base) var(--ease-spring)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-1)'
    }
  }, label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
function SegmentedControl({
  options = [],
  value,
  onChange,
  fullWidth,
  size = 'md'
}) {
  const h = size === 'sm' ? 32 : 40;
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: fullWidth ? 'flex' : 'inline-flex',
      gap: 2,
      padding: 4,
      borderRadius: 99,
      background: 'var(--surface-sunken)'
    }
  }, options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const l = typeof o === 'string' ? o : o.label;
    const on = v === value;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": on,
      type: "button",
      onClick: () => onChange && onChange(v),
      style: {
        flex: fullWidth ? 1 : undefined,
        height: h,
        padding: '0 18px',
        borderRadius: 99,
        border: 0,
        cursor: 'pointer',
        background: on ? 'var(--surface-card)' : 'transparent',
        boxShadow: on ? 'var(--shadow-sm)' : 'none',
        color: on ? 'var(--text-1)' : 'var(--text-2)',
        font: size === 'sm' ? '700 12px/1 var(--font-body)' : 'var(--type-label)',
        transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base)',
        whiteSpace: 'nowrap'
      }
    }, l);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  options = [],
  value,
  onChange,
  placeholder,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-2)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: e => onChange && onChange(e.target.value),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      height: 'var(--control-md)',
      padding: '0 48px 0 16px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)',
      border: 'var(--border-w) solid var(--border-1)',
      font: 'var(--type-body)',
      color: value ? 'var(--text-1)' : 'var(--text-3)',
      cursor: 'pointer',
      outline: 0
    }
  }, placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const l = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 6,
      top: 6,
      bottom: 6,
      width: 36,
      borderRadius: 'var(--radius-sm)',
      background: 'var(--apricot-300)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      color: 'var(--dusk-900)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 18
  }))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Stepper.jsx
try { (() => {
function Btn({
  icon,
  onClick,
  disabled,
  size
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    disabled: disabled,
    "aria-label": icon,
    style: {
      width: size,
      height: size,
      borderRadius: 99,
      border: 0,
      background: 'var(--apricot-300)',
      color: 'var(--dusk-900)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .4 : 1,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: Math.round(size * 0.5)
  }));
}
function Stepper({
  value = 0,
  onChange,
  min = 0,
  max = 99,
  size = 'md',
  addLabel = 'Add',
  unit
}) {
  const s = size === 'sm' ? 28 : 36;
  const set = v => onChange && onChange(Math.max(min, Math.min(max, v)));
  if (value <= 0 && addLabel) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => set(1),
      style: {
        height: s + 8,
        padding: '0 4px 0 14px',
        borderRadius: 99,
        border: 'var(--border-w) solid var(--border-1)',
        background: 'var(--surface-card)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
        font: 'var(--type-label)',
        color: 'var(--text-1)'
      }
    }, addLabel, /*#__PURE__*/React.createElement("span", {
      style: {
        width: s,
        height: s,
        borderRadius: 99,
        background: 'var(--apricot-300)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "plus",
      size: Math.round(s * .5)
    })));
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      height: s + 8,
      padding: 4,
      boxSizing: 'border-box',
      borderRadius: 99,
      background: 'var(--surface-card)',
      border: 'var(--border-w) solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    icon: value <= 1 && addLabel ? 'trash-2' : 'minus',
    size: s,
    onClick: () => set(value - 1),
    disabled: value <= min && !addLabel
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: s,
      textAlign: 'center',
      font: (size === 'sm' ? '700 14px' : '700 16px') + '/1 var(--font-display)',
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--text-1)'
    }
  }, value, unit ? ' ' + unit : ''), /*#__PURE__*/React.createElement(Btn, {
    icon: "plus",
    size: s,
    onClick: () => set(value + 1),
    disabled: value >= max
  }));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/forms/Toggle.jsx
try { (() => {
function Toggle({
  checked,
  onChange,
  label,
  disabled
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .4 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "switch",
    "aria-checked": !!checked,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: 48,
      height: 28,
      borderRadius: 99,
      padding: 3,
      boxSizing: 'border-box',
      background: checked ? 'var(--dusk-500)' : 'var(--cream-300)',
      transition: 'background var(--dur-base) var(--ease-out)',
      display: 'inline-flex',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 99,
      background: checked ? 'var(--apricot-300)' : 'var(--cream-50)',
      boxShadow: 'var(--shadow-xs)',
      transform: checked ? 'translateX(20px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-spring), background var(--dur-base)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-1)'
    }
  }, label));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/list/CategoryBudget.jsx
try { (() => {
const T = {
  sage: ['var(--cat-produce-bg)', 'sage'],
  lavender: ['var(--cat-dairy-bg)', 'lavender'],
  apricot: ['var(--cat-pantry-bg)', 'apricot'],
  tangerine: ['var(--cat-treats-bg)', 'tangerine'],
  dusk: ['var(--cat-household-bg)', 'dusk']
};
function CategoryBudget({
  name,
  icon,
  tone = 'sage',
  spent = 0,
  budget = 100,
  currency = '฿',
  onClick
}) {
  const left = budget - spent;
  const over = left < 0;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: 16,
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      cursor: onClick ? 'pointer' : undefined
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-md)',
      background: T[tone][0],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 22,
    color: "var(--dusk-700)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-h4)'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 15px/1 var(--font-display)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, currency, Math.round(spent).toLocaleString('en-US'), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-3)',
      fontWeight: 600
    }
  }, " / ", currency, budget.toLocaleString('en-US')))), /*#__PURE__*/React.createElement(__ds_scope.ProgressBar, {
    value: spent,
    max: budget,
    tone: T[tone][1],
    height: 8
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: over ? 'var(--tangerine-700)' : 'var(--text-3)'
    }
  }, over ? currency + Math.round(Math.abs(left)).toLocaleString('en-US') + ' over — no stress, it happens' : currency + Math.round(left).toLocaleString('en-US') + ' left this week')));
}
Object.assign(__ds_scope, { CategoryBudget });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/list/CategoryBudget.jsx", error: String((e && e.message) || e) }); }

// components/list/ItemTile.jsx
try { (() => {
const T = {
  sage: 'var(--cat-produce-bg)',
  lavender: 'var(--cat-dairy-bg)',
  apricot: 'var(--cat-pantry-bg)',
  tangerine: 'var(--cat-treats-bg)',
  dusk: 'var(--cat-household-bg)',
  cream: 'var(--surface-sunken)'
};
function ItemTile({
  label,
  icon,
  tone = 'cream',
  selected,
  onClick,
  meta
}) {
  const [p, setP] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onPointerDown: () => setP(true),
    onPointerUp: () => setP(false),
    onPointerLeave: () => setP(false),
    style: {
      position: 'relative',
      aspectRatio: '1 / 1',
      width: '100%',
      padding: 10,
      borderRadius: 'var(--radius-md)',
      background: T[tone],
      border: 'var(--border-w) solid ' + (selected ? 'var(--dusk-500)' : 'transparent'),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      cursor: 'pointer',
      color: 'var(--text-1)',
      transform: p ? 'scale(.96)' : 'none',
      transition: 'transform var(--dur-fast) var(--ease-out), border-color var(--dur-base)'
    }
  }, selected && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 20,
      height: 20,
      borderRadius: 99,
      background: 'var(--dusk-500)',
      color: 'var(--cream-50)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 13
  })), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 30,
    color: "var(--dusk-700)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 13px/1.25 var(--font-body)',
      textAlign: 'center'
    }
  }, label), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-3)',
      marginTop: -6
    }
  }, meta));
}
Object.assign(__ds_scope, { ItemTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/list/ItemTile.jsx", error: String((e && e.message) || e) }); }

// components/list/ShoppingItem.jsx
try { (() => {
function ShoppingItem({
  name,
  qty,
  price,
  note,
  checked,
  onToggle,
  addedBy,
  addedByTone = 'lavender',
  category,
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 16px',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-md)',
      minHeight: 64,
      boxSizing: 'border-box',
      cursor: onClick ? 'pointer' : undefined
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement(__ds_scope.Checkbox, {
    checked: checked,
    onChange: onToggle
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-strong)',
      color: checked ? 'var(--text-3)' : 'var(--text-1)',
      textDecoration: checked ? 'line-through' : 'none',
      textDecorationColor: 'var(--sage-500)',
      textDecorationThickness: 2,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, name), (qty || note) && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-small)',
      color: 'var(--text-3)'
    }
  }, [qty, note].filter(Boolean).join(' · '))), price != null && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 15px/1 var(--font-display)',
      fontVariantNumeric: 'tabular-nums',
      color: checked ? 'var(--text-3)' : 'var(--text-1)'
    }
  }, typeof price === 'number' ? '฿' + price.toLocaleString('en-US', {
    maximumFractionDigits: 2
  }) : price), addedBy && /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: addedBy,
    tone: addedByTone,
    size: 26
  }));
}
Object.assign(__ds_scope, { ShoppingItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/list/ShoppingItem.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TabBar.jsx
try { (() => {
function TabBar({
  items = [],
  active,
  onChange,
  floating = true
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 4,
      padding: 6,
      borderRadius: floating ? 99 : 0,
      background: 'var(--surface-card)',
      boxShadow: floating ? 'var(--shadow-md)' : 'none',
      borderTop: floating ? 'none' : 'var(--border-w) solid var(--border-1)'
    }
  }, items.map(it => {
    const on = it.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      type: "button",
      onClick: () => onChange && onChange(it.id),
      "aria-label": it.label,
      style: {
        position: 'relative',
        height: 48,
        minWidth: 48,
        padding: on ? '0 18px 0 14px' : 0,
        flex: on ? '0 0 auto' : 1,
        borderRadius: 99,
        border: 0,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        background: on ? 'var(--dusk-500)' : 'transparent',
        color: on ? 'var(--cream-50)' : 'var(--text-2)',
        font: 'var(--type-label)',
        transition: 'background var(--dur-base) var(--ease-out), padding var(--dur-base) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 20
    }), on && it.label, it.badge && !on && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 10,
        right: '50%',
        marginRight: -14,
        width: 8,
        height: 8,
        borderRadius: 99,
        background: 'var(--tangerine-500)',
        boxShadow: '0 0 0 2px var(--surface-card)'
      }
    }));
  }));
}
Object.assign(__ds_scope, { TabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TabBar.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
const T = {
  default: 'var(--surface-card)',
  sunken: 'var(--surface-sunken)',
  lavender: 'var(--lavender-100)',
  sage: 'var(--sage-100)',
  apricot: 'var(--apricot-100)',
  tangerine: 'var(--tangerine-100)',
  inverse: 'var(--dusk-900)'
};
function Card({
  children,
  tone = 'default',
  padding = 20,
  radius = 'var(--radius-lg)',
  elevated,
  bordered,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      background: T[tone],
      color: tone === 'inverse' ? 'var(--text-inverse)' : 'var(--text-1)',
      borderRadius: radius,
      padding,
      boxShadow: elevated ? 'var(--shadow-sm)' : 'none',
      border: bordered ? 'var(--border-w) solid var(--border-1)' : 'none',
      cursor: onClick ? 'pointer' : undefined,
      boxSizing: 'border-box',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/GradientCard.jsx
try { (() => {
const G = {
  sunset: 'var(--grad-sunset)',
  dusk: 'var(--grad-dusk)',
  meadow: 'var(--grad-meadow)',
  peach: 'var(--grad-peach)'
};
function GradientCard({
  gradient = 'sunset',
  grain = true,
  children,
  padding = 24,
  radius = 'var(--radius-xl)',
  minHeight,
  style
}) {
  const dark = gradient === 'dusk';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      isolation: 'isolate',
      overflow: 'hidden',
      background: G[gradient],
      borderRadius: radius,
      padding,
      minHeight,
      color: dark ? 'var(--cream-50)' : 'var(--dusk-900)',
      boxSizing: 'border-box',
      ...style
    }
  }, grain && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'var(--grain)',
      opacity: 'var(--grain-opacity)',
      mixBlendMode: 'var(--grain-blend)',
      pointerEvents: 'none',
      zIndex: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, children));
}
Object.assign(__ds_scope, { GradientCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/GradientCard.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Sheet.jsx
try { (() => {
function Sheet({
  open,
  onClose,
  title,
  children,
  footer
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 50,
      pointerEvents: open ? 'auto' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--surface-overlay)',
      opacity: open ? 1 : 0,
      transition: 'opacity var(--dur-slow) var(--ease-out)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      maxHeight: '88%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-app)',
      borderRadius: 'var(--radius-2xl) var(--radius-2xl) 0 0',
      boxShadow: 'var(--shadow-lg)',
      transform: open ? 'translateY(0)' : 'translateY(105%)',
      transition: 'transform var(--dur-slow) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 5,
      borderRadius: 99,
      background: 'var(--cream-300)',
      margin: '10px auto 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 20px 8px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: 'var(--type-h2)',
      letterSpacing: 'var(--tracking-tight)'
    }
  }, title), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Close",
    size: 40,
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 20px 20px',
      overflowY: 'auto',
      flex: 1
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 20px 28px',
      borderTop: 'var(--border-w) solid var(--border-1)',
      display: 'flex',
      gap: 10
    }
  }, footer)));
}
Object.assign(__ds_scope, { Sheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Sheet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/AddItemSheet.jsx
try { (() => {
function AddItemSheet({
  open,
  onClose,
  onSave
}) {
  const {
    Sheet,
    Input,
    ItemTile,
    Stepper,
    Select,
    Button
  } = window.RestockDesignSystem_25704b;
  const D = window.RS_DATA;
  const [name, setName] = React.useState('');
  const [cat, setCat] = React.useState('produce');
  const [qty, setQty] = React.useState(1);
  const [price, setPrice] = React.useState('');
  const [by, setBy] = React.useState('maya');
  const save = () => {
    if (!name.trim()) return;
    onSave({
      id: Date.now(),
      name: name.trim(),
      qty: String(qty),
      price: parseFloat(price) || null,
      cat,
      by,
      done: false
    });
    setName('');
    setPrice('');
    setQty(1);
  };
  return /*#__PURE__*/React.createElement(Sheet, {
    open: open,
    onClose: onClose,
    title: "Add to the list",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      fullWidth: true,
      onClick: onClose
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      fullWidth: true,
      onClick: save,
      disabled: !name.trim()
    }, "Add item"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "What do you need?",
    placeholder: "e.g. Greek yogurt",
    value: name,
    onChange: setName
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-2)',
      marginBottom: 8
    }
  }, "Category"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: 8
    }
  }, D.categories.map(c => /*#__PURE__*/React.createElement(ItemTile, {
    key: c.id,
    label: c.name.split(' ')[0],
    icon: c.icon,
    tone: c.tone,
    selected: cat === c.id,
    onClick: () => setCat(c.id)
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-2)',
      marginBottom: 6
    }
  }, "How many"), /*#__PURE__*/React.createElement(Stepper, {
    value: qty,
    onChange: setQty,
    addLabel: "",
    min: 1
  })), /*#__PURE__*/React.createElement(Input, {
    label: "Rough price",
    prefix: "\u0E3F",
    placeholder: "0",
    value: price,
    onChange: setPrice,
    style: {
      flex: 1
    }
  })), /*#__PURE__*/React.createElement(Select, {
    label: "Who\u2019s adding",
    value: by,
    onChange: setBy,
    options: D.members.map(m => ({
      value: m.id,
      label: m.name
    }))
  })));
}
window.AddItemSheet = AddItemSheet;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AddItemSheet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/HomeScreen.jsx
try { (() => {
function HomeScreen({
  items,
  go,
  me
}) {
  const {
    GradientCard,
    ProgressBar,
    CategoryBudget,
    Avatar,
    Sticker,
    IconButton,
    ShoppingItem
  } = window.RestockDesignSystem_25704b;
  const D = window.RS_DATA;
  const total = Object.values(D.spent).reduce((a, b) => a + b, 0);
  const left = D.budget - total;
  const open = items.filter(i => !i.done).length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 20px 120px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-3)'
    }
  }, "Week of Nov 3"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '6px 0 0',
      font: 'var(--type-h1)',
      letterSpacing: '-.02em'
    }
  }, "Hi, Maya")), /*#__PURE__*/React.createElement(IconButton, {
    icon: "bell",
    label: "Notifications"
  })), /*#__PURE__*/React.createElement(GradientCard, {
    gradient: "sunset",
    padding: 22
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: -6,
      top: -10
    }
  }, /*#__PURE__*/React.createElement(Sticker, {
    shape: "circle",
    tone: "cream",
    top: "Under by",
    main: '฿' + Math.round(left).toLocaleString('en-US'),
    size: 88,
    rotate: 10
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-caption)',
      opacity: .85
    }
  }, "Spent this week"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-number-xl)',
      letterSpacing: '-.03em',
      marginTop: 6,
      fontVariantNumeric: 'tabular-nums'
    }
  }, '฿' + Math.round(total).toLocaleString('en-US')), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-small)',
      marginTop: 4,
      marginBottom: 18
    }
  }, "of your ", '฿' + D.budget.toLocaleString('en-US'), " household budget"), /*#__PURE__*/React.createElement(ProgressBar, {
    value: total,
    max: D.budget,
    tone: "dusk",
    track: "rgba(255,253,246,.5)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, D.members.map((m, i) => /*#__PURE__*/React.createElement("span", {
    key: m.id,
    style: {
      marginLeft: i ? -8 : 0
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: m.name,
    tone: m.tone,
    size: 30,
    ring: true
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: () => go('spend'),
    style: {
      border: 0,
      background: 'rgba(255,253,246,.6)',
      backdropFilter: 'blur(12px)',
      borderRadius: 99,
      height: 34,
      padding: '0 14px',
      font: 'var(--type-label)',
      fontSize: 13,
      color: 'var(--dusk-900)',
      cursor: 'pointer'
    }
  }, "See breakdown"))), /*#__PURE__*/React.createElement("div", {
    onClick: () => go('list'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: 16,
      background: 'var(--dusk-500)',
      color: 'var(--cream-50)',
      borderRadius: 'var(--radius-lg)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 14,
      background: 'var(--apricot-300)',
      color: 'var(--dusk-900)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon-list-checks",
    style: {
      fontSize: 22
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-h4)'
    }
  }, open, " things left to grab"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-small)',
      opacity: .75
    }
  }, "Saturday shop \xB7 Sam\u2019s going")), /*#__PURE__*/React.createElement("i", {
    className: "icon-arrow-right",
    style: {
      fontSize: 20
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: 'var(--type-h3)'
    }
  }, "Categories"), /*#__PURE__*/React.createElement("a", {
    onClick: () => go('spend'),
    style: {
      font: 'var(--type-label)',
      fontSize: 13,
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'var(--text-2)'
    }
  }, "All")), D.categories.slice(0, 3).map(c => /*#__PURE__*/React.createElement(CategoryBudget, {
    key: c.id,
    name: c.name,
    icon: c.icon,
    tone: c.tone,
    spent: D.spent[c.id],
    budget: c.budget
  }))));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/HouseholdScreen.jsx
try { (() => {
function HouseholdScreen({
  items
}) {
  const {
    Card,
    Avatar,
    Toggle,
    Button,
    GradientCard,
    Sticker,
    Badge
  } = window.RestockDesignSystem_25704b;
  const D = window.RS_DATA;
  const [notify, setNotify] = React.useState({
    maya: true,
    sam: true,
    jo: false,
    ari: true
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 20px 120px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--type-h1)',
      letterSpacing: '-.02em'
    }
  }, "The Chen-Ortiz house"), /*#__PURE__*/React.createElement(GradientCard, {
    gradient: "dusk",
    padding: 22
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 4,
      top: -6
    }
  }, /*#__PURE__*/React.createElement(Sticker, {
    shape: "oval",
    tone: "apricot",
    main: "Sat",
    bottom: "10 am",
    size: 70,
    rotate: 8
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-caption)',
      opacity: .8
    }
  }, "Next shop"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-h2)',
      marginTop: 6
    }
  }, "Sam\u2019s doing the run"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-small)',
      opacity: .8,
      marginTop: 4
    }
  }, "Add anything by Friday night.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, D.members.map(m => {
    const n = items.filter(i => i.by === m.id).length;
    return /*#__PURE__*/React.createElement(Card, {
      key: m.id,
      padding: 16,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: m.name,
      tone: m.tone,
      size: 44
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--type-h4)'
      }
    }, m.name, m.id === 'maya' ? ' (you)' : ''), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--type-small)',
        color: 'var(--text-3)'
      }
    }, n, " item", n === 1 ? '' : 's', " on the list")), /*#__PURE__*/React.createElement(Toggle, {
      checked: notify[m.id],
      onChange: v => setNotify({
        ...notify,
        [m.id]: v
      })
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-small)',
      color: 'var(--text-3)',
      textAlign: 'center'
    }
  }, "Toggle to get a nudge when they add something."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconLeft: "user-plus",
    fullWidth: true
  }, "Invite someone"));
}
window.HouseholdScreen = HouseholdScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/HouseholdScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ListScreen.jsx
try { (() => {
function ListScreen({
  items,
  setItems,
  onAdd
}) {
  const {
    SegmentedControl,
    Input,
    ShoppingItem,
    Tag,
    Sticker,
    Button
  } = window.RestockDesignSystem_25704b;
  const D = window.RS_DATA;
  const [tab, setTab] = React.useState('All');
  const [q, setQ] = React.useState('');
  const who = id => D.members.find(m => m.id === id);
  const shown = items.filter(i => (tab === 'Mine' ? i.by === 'maya' : tab === 'Done' ? i.done : true) && i.name.toLowerCase().includes(q.toLowerCase()));
  const toggle = id => setItems(items.map(i => i.id === id ? {
    ...i,
    done: !i.done
  } : i));
  const done = items.filter(i => i.done).length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 20px 120px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-3)'
    }
  }, done, " of ", items.length, " in the cart"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '6px 0 0',
      font: 'var(--type-h1)',
      letterSpacing: '-.02em'
    }
  }, "This week\u2019s list")), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    iconLeft: "plus",
    onClick: onAdd
  }, "Add")), /*#__PURE__*/React.createElement(SegmentedControl, {
    options: ['All', 'Mine', 'Done'],
    value: tab,
    onChange: setTab,
    fullWidth: true
  }), /*#__PURE__*/React.createElement(Input, {
    iconLeft: "search",
    placeholder: "Search the list",
    value: q,
    onChange: setQ
  }), D.categories.map(c => {
    const rows = shown.filter(i => i.cat === c.id);
    if (!rows.length) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      tone: c.tone === 'dusk' ? 'lavender' : c.tone,
      icon: c.icon,
      size: "sm"
    }, c.name), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--type-caption)',
        color: 'var(--text-3)'
      }
    }, rows.length)), rows.map(i => /*#__PURE__*/React.createElement("div", {
      key: i.id,
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement(ShoppingItem, {
      name: i.name,
      qty: i.qty,
      note: i.note,
      price: i.price,
      checked: i.done,
      onToggle: () => toggle(i.id),
      addedBy: who(i.by).name,
      addedByTone: who(i.by).tone
    }), i.sale && !i.done && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        right: 96,
        top: -10
      }
    }, /*#__PURE__*/React.createElement(Sticker, {
      shape: "burst",
      tone: "tangerine",
      main: "Sale",
      size: 46,
      rotate: -12
    })))));
  }), !shown.length && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14,
      padding: '40px 0',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Sticker, {
    shape: "circle",
    tone: "sage",
    icon: "check-check",
    bottom: "All clear",
    size: 96,
    rotate: -6
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-2)'
    }
  }, "Nothing here yet.")));
}
window.ListScreen = ListScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ListScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/SpendScreen.jsx
try { (() => {
function SpendScreen() {
  const {
    SegmentedControl,
    GradientCard,
    CategoryBudget,
    Tag
  } = window.RestockDesignSystem_25704b;
  const D = window.RS_DATA;
  const [range, setRange] = React.useState('Week');
  const total = Object.values(D.spent).reduce((a, b) => a + b, 0);
  const max = Math.max(...D.weeks.map(w => w.v));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 20px 120px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--type-h1)',
      letterSpacing: '-.02em'
    }
  }, "Spending"), /*#__PURE__*/React.createElement(SegmentedControl, {
    size: "sm",
    options: ['Week', 'Month'],
    value: range,
    onChange: setRange
  })), /*#__PURE__*/React.createElement(GradientCard, {
    gradient: "peach",
    padding: 22
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-caption)'
    }
  }, range === 'Week' ? 'This week so far' : 'November so far'), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-number-xl)',
      letterSpacing: '-.03em',
      marginTop: 6
    }
  }, '฿' + Math.round(range === 'Week' ? total : total + 0).toLocaleString('en-US')), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "sage",
    icon: "trending-down",
    size: "sm"
  }, "\u0E3F1,165 less than last week")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 12,
      height: 110,
      marginTop: 20
    }
  }, D.weeks.map((w, i) => {
    const last = i === D.weeks.length - 1;
    return /*#__PURE__*/React.createElement("div", {
      key: w.l,
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        height: '100%',
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '700 11px/1 var(--font-display)'
      }
    }, '฿' + (w.v / 1000).toFixed(1) + 'k'), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        height: w.v / max * 70 + '%',
        borderRadius: 10,
        background: last ? 'var(--dusk-500)' : 'rgba(255,253,246,.6)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--type-caption)',
        fontSize: 11
      }
    }, w.l));
  }))), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '4px 0 0',
      font: 'var(--type-h3)'
    }
  }, "By category"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, D.categories.map(c => /*#__PURE__*/React.createElement(CategoryBudget, {
    key: c.id,
    name: c.name,
    icon: c.icon,
    tone: c.tone,
    spent: D.spent[c.id],
    budget: c.budget
  }))));
}
window.SpendScreen = SpendScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/SpendScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/data.js
try { (() => {
window.RS_DATA = {
  members: [{
    id: 'maya',
    name: 'Maya Chen',
    tone: 'apricot'
  }, {
    id: 'sam',
    name: 'Sam Ortiz',
    tone: 'sage'
  }, {
    id: 'jo',
    name: 'Jo Lee',
    tone: 'lavender'
  }, {
    id: 'ari',
    name: 'Ari Park',
    tone: 'dusk'
  }],
  categories: [{
    id: 'produce',
    name: 'Produce',
    icon: 'carrot',
    tone: 'sage',
    budget: 2000
  }, {
    id: 'dairy',
    name: 'Dairy & eggs',
    icon: 'milk',
    tone: 'lavender',
    budget: 1200
  }, {
    id: 'pantry',
    name: 'Pantry',
    icon: 'wheat',
    tone: 'apricot',
    budget: 1500
  }, {
    id: 'treats',
    name: 'Treats',
    icon: 'cookie',
    tone: 'tangerine',
    budget: 700
  }, {
    id: 'household',
    name: 'Household',
    icon: 'spray-can',
    tone: 'dusk',
    budget: 1000
  }],
  items: [{
    id: 1,
    name: 'Bananas',
    qty: '6',
    price: 45,
    cat: 'produce',
    by: 'sam',
    done: true
  }, {
    id: 2,
    name: 'Baby spinach',
    qty: '1 bag',
    price: 65,
    cat: 'produce',
    by: 'maya',
    done: false
  }, {
    id: 3,
    name: 'Avocados',
    qty: '3',
    price: 159,
    cat: 'produce',
    by: 'jo',
    done: false,
    sale: true
  }, {
    id: 4,
    name: 'Oat milk',
    qty: '2 cartons',
    price: 238,
    cat: 'dairy',
    by: 'sam',
    done: false
  }, {
    id: 5,
    name: 'Free-range eggs',
    qty: '12',
    price: 125,
    cat: 'dairy',
    by: 'maya',
    done: true
  }, {
    id: 6,
    name: 'Sourdough loaf',
    qty: '1',
    note: 'from the bakery',
    price: 180,
    cat: 'pantry',
    by: 'ari',
    done: false
  }, {
    id: 7,
    name: 'Coffee beans',
    qty: '500g',
    price: 420,
    cat: 'pantry',
    by: 'jo',
    done: false
  }, {
    id: 8,
    name: 'Dark chocolate',
    qty: '2 bars',
    price: 178,
    cat: 'treats',
    by: 'ari',
    done: false
  }, {
    id: 9,
    name: 'Dish soap',
    qty: '1',
    price: 59,
    cat: 'household',
    by: 'maya',
    done: false
  }],
  spent: {
    produce: 1340,
    dairy: 1115,
    pantry: 1030,
    treats: 810,
    household: 700
  },
  weeks: [{
    l: 'Oct 13',
    v: 5880
  }, {
    l: 'Oct 20',
    v: 5290
  }, {
    l: 'Oct 27',
    v: 6160
  }, {
    l: 'This wk',
    v: 4995
  }],
  budget: 6500
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Sticker = __ds_scope.Sticker;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.PageDots = __ds_scope.PageDots;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.CategoryBudget = __ds_scope.CategoryBudget;

__ds_ns.ItemTile = __ds_scope.ItemTile;

__ds_ns.ShoppingItem = __ds_scope.ShoppingItem;

__ds_ns.TabBar = __ds_scope.TabBar;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.GradientCard = __ds_scope.GradientCard;

__ds_ns.Sheet = __ds_scope.Sheet;

})();
