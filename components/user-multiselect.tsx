/** biome-ignore-all lint/complexity/noForEach: <explanation> */
/** biome-ignore-all lint/complexity/noUselessFragments: <explanation> */
/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
/** biome-ignore-all lint/nursery/noNoninteractiveElementInteractions: <explanation> */
/** biome-ignore-all lint/nursery/noShadow: <explanation> */
/** biome-ignore-all lint/nursery/noNestedComponentDefinitions: <explanation> */
/** biome-ignore-all lint/complexity/noVoid: <explanation> */
/** biome-ignore-all lint/suspicious/useAwait: <explanation> */
/** biome-ignore-all lint/style/useBlockStatements: <explanation> */
/** biome-ignore-all lint/style/useAtIndex: <explanation> */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
'use client';

import { Command as CommandPrimitive, useCommandState } from 'cmdk';
import { XIcon } from 'lucide-react';
import * as React from 'react';
import { useEffect } from 'react';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import UserAvatar from './user-avatar';

export interface UserOption {
  id: string;
  name: string;
  imageUrl?: string;
  disable?: boolean;
  /** fixed option that can't be removed. */
  fixed?: boolean;
  /** Group the options by providing key. */
  [key: string]: string | boolean | undefined;
}
interface GroupUserOption {
  [key: string]: UserOption[];
}

interface UserMultiSelectProps {
  value?: UserOption[];
  defaultOptions?: UserOption[];
  /** manually controlled options */
  options?: UserOption[];
  placeholder?: string;
  /** Loading component. */
  loadingIndicator?: React.ReactNode;
  /** Empty component. */
  emptyIndicator?: React.ReactNode;
  /** Debounce time for async search. Only work with `onSearch`. */
  delay?: number;
  /**
   * Only work with `onSearch` prop. Trigger search when `onFocus`.
   * For example, when user click on the input, it will trigger the search to get initial options.
   */
  triggerSearchOnFocus?: boolean;
  /** async search */
  onSearch?: (value: string) => Promise<UserOption[]>;
  /**
   * sync search. This search will not showing loadingIndicator.
   * The rest props are the same as async search.
   * i.e.: creatable, groupBy, delay.
   */
  onSearchSync?: (value: string) => UserOption[];
  onChange?: (options: UserOption[]) => void;
  /** Limit the maximum number of selected options. */
  maxSelected?: number;
  /** When the number of selected options exceeds the limit, the onMaxSelected will be called. */
  onMaxSelected?: (maxLimit: number) => void;
  /** Hide the placeholder when there are options selected. */
  hidePlaceholderWhenSelected?: boolean;
  disabled?: boolean;
  /** Group the options base on provided key. */
  groupBy?: string;
  className?: string;
  badgeClassName?: string;
  /**
   * First item selected is a default behavior by cmdk. That is why the default is true.
   * This is a workaround solution by add a dummy item.
   *
   * @reference: https://github.com/pacocoursey/cmdk/issues/171
   */
  selectFirstItem?: boolean;
  /** Allow user to create option when there is no option matched. */
  creatable?: boolean;
  /** Props of `Command` */
  commandProps?: React.ComponentPropsWithoutRef<typeof Command>;
  /** Props of `CommandInput` */
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
    'value' | 'placeholder' | 'disabled'
  >;
  /** hide the clear all button. */
  hideClearAllButton?: boolean;
}

export interface UserMultiSelectRef {
  selectedValue: UserOption[];
  input: HTMLInputElement;
  focus: () => void;
  reset: () => void;
}

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

function transToGroupOption(options: UserOption[], groupBy?: string) {
  if (options.length === 0) {
    return {};
  }
  if (!groupBy) {
    return {
      '': options,
    };
  }

  const groupOption: GroupUserOption = {};
  options.forEach((option) => {
    const key = (option[groupBy] as string) || '';
    if (!groupOption[key]) {
      groupOption[key] = [];
    }
    groupOption[key].push(option);
  });
  return groupOption;
}

function removePickedOption(
  groupOption: GroupUserOption,
  picked: UserOption[]
) {
  const cloneOption = JSON.parse(
    JSON.stringify(groupOption)
  ) as GroupUserOption;

  for (const [key, value] of Object.entries(cloneOption)) {
    cloneOption[key] = value.filter(
      (val) => !picked.find((p) => p.id === val.id)
    );
  }
  return cloneOption;
}

// function isOptionsExist(
//   groupOption: GroupUserOption,
//   targetOption: UserOption[]
// ) {
//   for (const [, value] of Object.entries(groupOption)) {
//     if (value.some((option) => targetOption.find((p) => p.id === option.id))) {
//       return true;
//     }
//   }
//   return false;
// }

const CommandEmpty = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) => {
  const render = useCommandState((state) => state.filtered.count === 0);

  if (!render) return null;

  return (
    <div
      className={cn('px-2 py-4 text-center text-sm', className)}
      cmdk-empty=""
      role="presentation"
      {...props}
    />
  );
};

CommandEmpty.displayName = 'CommandEmpty';

const UserMultiSelect = ({
  value,
  onChange,
  placeholder,
  defaultOptions: arrayDefaultOptions = [],
  options: arrayOptions,
  delay,
  onSearch,
  onSearchSync,
  loadingIndicator,
  emptyIndicator,
  maxSelected = Number.MAX_SAFE_INTEGER,
  onMaxSelected,
  hidePlaceholderWhenSelected,
  disabled,
  groupBy,
  className,
  badgeClassName,
  selectFirstItem = true,
  creatable = false,
  triggerSearchOnFocus = false,
  commandProps,
  inputProps,
  hideClearAllButton = false,
}: UserMultiSelectProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [onScrollbar, setOnScrollbar] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null); // Added this

  const [selected, setSelected] = React.useState<UserOption[]>(value || []);
  const [options, setOptions] = React.useState<GroupUserOption>(
    transToGroupOption(arrayDefaultOptions, groupBy)
  );
  const [inputValue, setInputValue] = React.useState('');
  const debouncedSearchTerm = useDebounce(inputValue, delay || 500);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
      inputRef.current.blur();
    }
  };

  const handleUnselect = React.useCallback(
    (option: UserOption) => {
      const newOptions = selected.filter((s) => s.id !== option.id);
      setSelected(newOptions);
      onChange?.(newOptions);
    },
    [onChange, selected]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (
          (e.key === 'Delete' || e.key === 'Backspace') &&
          input.id === '' &&
          selected.length > 0
        ) {
          const lastSelectOption = selected[selected.length - 1];
          // If last item is fixed, we should not remove it.
          if (!lastSelectOption.fixed) {
            handleUnselect(selected[selected.length - 1]);
          }
        }
        // This is not a default behavior of the <input /> field
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    [handleUnselect, selected]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchend', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  useEffect(() => {
    /** If `onSearch` is provided, do not trigger options updated. */
    if (!arrayOptions || onSearch) {
      return;
    }
    const newOption = transToGroupOption(arrayOptions || [], groupBy);
    if (JSON.stringify(newOption) !== JSON.stringify(options)) {
      setOptions(newOption);
    }
  }, [arrayDefaultOptions, arrayOptions, groupBy, onSearch, options]);

  useEffect(() => {
    /** sync search */

    const doSearchSync = () => {
      const res = onSearchSync?.(debouncedSearchTerm);
      setOptions(transToGroupOption(res || [], groupBy));
    };

    const exec = async () => {
      if (!(onSearchSync && open)) return;

      if (triggerSearchOnFocus) {
        doSearchSync();
      }

      if (debouncedSearchTerm) {
        doSearchSync();
      }
    };

    void exec();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus]);

  useEffect(() => {
    /** async search */

    const doSearch = async () => {
      setIsLoading(true);
      const res = await onSearch?.(debouncedSearchTerm);
      setOptions(transToGroupOption(res || [], groupBy));
      setIsLoading(false);
    };

    const exec = async () => {
      if (!(onSearch && open)) return;

      if (triggerSearchOnFocus) {
        await doSearch();
      }

      if (debouncedSearchTerm) {
        await doSearch();
      }
    };

    void exec();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus]);

  const EmptyItem = React.useCallback(() => {
    if (!emptyIndicator) return;

    // For async search that showing emptyIndicator
    if (onSearch && !creatable && Object.keys(options).length === 0) {
      return (
        <CommandItem disabled value="-">
          {emptyIndicator}
        </CommandItem>
      );
    }

    return <CommandEmpty>{emptyIndicator}</CommandEmpty>;
  }, [creatable, emptyIndicator, onSearch, options]);

  const selectables = React.useMemo<GroupUserOption>(
    () => removePickedOption(options, selected),
    [options, selected]
  );

  /** Avoid Creatable Selector freezing or lagging when paste a long string. */
  const commandFilter = React.useCallback(() => {
    if (commandProps?.filter) {
      return commandProps.filter;
    }

    if (creatable) {
      return (value: string, search: string) => {
        return value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
      };
    }
    // Using default filter in `cmdk`. We don&lsquo;t have to provide it.
    return;
  }, [creatable, commandProps?.filter]);

  return (
    <Command
      ref={dropdownRef}
      {...commandProps}
      className={cn(
        'h-auto overflow-visible bg-transparent',
        commandProps?.className
      )}
      filter={commandFilter()}
      onKeyDown={(e) => {
        handleKeyDown(e);
        commandProps?.onKeyDown?.(e);
      }} // When onSearch is provided, we don&lsquo;t want to filter the options. You can still override it.
      shouldFilter={
        commandProps?.shouldFilter !== undefined
          ? commandProps.shouldFilter
          : !onSearch
      }
    >
      <div
        className={cn(
          'relative min-h-[38px] rounded-md border border-input text-sm shadow-xs outline-none transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-aria-invalid:border-destructive has-disabled:opacity-50 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40',
          {
            'p-1': selected.length !== 0,
            'cursor-text': !disabled && selected.length !== 0,
          },
          !hideClearAllButton && 'pe-9',
          className
        )}
        onClick={() => {
          if (disabled) return;
          inputRef?.current?.focus();
        }}
      >
        <div className="flex flex-wrap gap-1">
          {selected.map((option) => {
            return (
              <div
                className={cn(
                  'relative inline-flex h-7 animate-fadeIn cursor-default items-center rounded-md border bg-background ps-2 pe-7 pl-2 text-secondary-foreground text-xs transition-all hover:bg-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-fixed:pe-2',
                  badgeClassName
                )}
                data-disabled={disabled || undefined}
                data-fixed={option.fixed}
                key={option.id}
              >
                {option.name}
                <button
                  aria-label="Remove"
                  className="-inset-y-px -end-px absolute flex size-7 items-center justify-center rounded-e-md border border-transparent p-0 text-muted-foreground/80 outline-none outline-hidden transition-[color,box-shadow] hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  onClick={() => handleUnselect(option)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(option);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <XIcon aria-hidden="true" size={14} />
                </button>
              </div>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            {...inputProps}
            className={cn(
              'flex-1 bg-transparent text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed',
              {
                'w-full': hidePlaceholderWhenSelected,
                'px-3 py-2': selected.length === 0,
                'ml-1': selected.length !== 0,
              },
              inputProps?.className
            )}
            disabled={disabled}
            onBlur={(event) => {
              if (!onScrollbar) {
                setOpen(false);
              }
              inputProps?.onBlur?.(event);
            }}
            onFocus={(event) => {
              setOpen(true);
              if (triggerSearchOnFocus) {
                onSearch?.(debouncedSearchTerm);
              }
              inputProps?.onFocus?.(event);
            }}
            onValueChange={(value) => {
              setInputValue(value);
              inputProps?.onValueChange?.(value);
            }}
            placeholder={
              hidePlaceholderWhenSelected && selected.length !== 0
                ? ''
                : placeholder
            }
            ref={inputRef}
            value={inputValue}
          />
          <button
            aria-label="Clear all"
            className={cn(
              'absolute end-0 top-0 flex size-9 items-center justify-center rounded-md border border-transparent text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
              (hideClearAllButton ||
                disabled ||
                selected.length < 1 ||
                selected.filter((s) => s.fixed).length === selected.length) &&
                'hidden'
            )}
            onClick={() => {
              setSelected(selected.filter((s) => s.fixed));
              onChange?.(selected.filter((s) => s.fixed));
            }}
            type="button"
          >
            <XIcon aria-hidden="true" size={16} />
          </button>
        </div>
      </div>
      <div className="relative">
        <div
          className={cn(
            'absolute top-2 z-10 w-full overflow-hidden rounded-md border border-input',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=open]:animate-in',
            !open && 'hidden'
          )}
          data-state={open ? 'open' : 'closed'}
        >
          {open && (
            <CommandList
              className="bg-popover text-popover-foreground shadow-lg outline-hidden"
              onMouseEnter={() => {
                setOnScrollbar(true);
              }}
              onMouseLeave={() => {
                setOnScrollbar(false);
              }}
              onMouseUp={() => {
                inputRef?.current?.focus();
              }}
            >
              {isLoading ? (
                <>{loadingIndicator}</>
              ) : (
                <>
                  {EmptyItem()}
                  {!selectFirstItem && (
                    <CommandItem className="hidden" value="-" />
                  )}
                  {Object.entries(selectables).map(([key, dropdowns]) => (
                    <CommandGroup
                      className="h-full overflow-auto"
                      heading={key}
                      key={key}
                    >
                      <>
                        {dropdowns.map((option) => {
                          return (
                            <CommandItem
                              className={cn(
                                'cursor-pointer gap-1.5',
                                option.disable &&
                                  'pointer-events-none cursor-not-allowed opacity-50'
                              )}
                              disabled={option.disable}
                              key={option.name}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onSelect={() => {
                                if (selected.length >= maxSelected) {
                                  onMaxSelected?.(selected.length);
                                  return;
                                }
                                setInputValue('');
                                const newOptions = [...selected, option];
                                setSelected(newOptions);
                                onChange?.(newOptions);
                              }}
                              value={option.name}
                            >
                              <UserAvatar className="size-6" user={option} />
                              {option.name}
                            </CommandItem>
                          );
                        })}
                      </>
                    </CommandGroup>
                  ))}
                </>
              )}
            </CommandList>
          )}
        </div>
      </div>
    </Command>
  );
};

UserMultiSelect.displayName = 'UserMultiSelect';
export default UserMultiSelect;
