
%lex
%options flex caseInsensitive

%%

[a-z][a-z0-9_$]* return 'VAR'
\d+(\.\d*)? return 'NUMBER'
"{" return '{'
"}" return '}'
"[" return '['
"]" return ']'
"@" return '@'
"$" return '$'
"${" return '${'
"<" return '<'
">" return '>'
\s*"/"\s* return '/'
\s*"-"\s* return '-'
\s*"+"\s* return '+'
\s*"*"\s* return '*'
\s+ return 'SPACE'
. return 'OTHER'
<<EOF>>               return 'EOF'

/lex

%start template

%ebnf

%{

class Wildcard {
  constructor(part1, part2) {
    this.wildcard = "";
    if (part1) {
      this.add(part1);
    }

     if (part2) {
       this.add(part2);
     }
  }

  add(part) {
    if (part instanceof Wildcard) {
      this.wildcard += part.wildcard;
    } else {
      this.wildcard += part;
    }
  }
}

%}

%%

template
  : templatePart EOF {return $1;}
  ;

templatePart
  : templatePart templatePart -> {templatePart: [$1, $2]}
  | substitution
  | expression
  | wildcard
  ;

wildcard
  : VAR
  | '<'
  | '>'
  | '/'
  | '*'
  | '$'
  | NUMBER
  | OTHER
  | SPACE
  | wildcard wildcard {{ $$ = new Wildcard($1, $2) }}
  ;

substitution
  : '${' expression '}' -> {sub: $2}
  ;

expression
  : '$'
  | VAR -> {variable: $VAR}
  | addition
  | subtraction
  | multiplication
  | NUMBER {{ $$ = Number($1); }}
  | division
  | SPACE
  | expression expression -> {expression: [$1, $2]}
  ;

addition
  : expression '+' expression -> {'+': [$1, $3]}
  ;

subtraction
  : expression '-' expression -> {'-': [$1, $3]}
  ;

multiplication
  : expression '*' expression -> {'*': [$1, $3]}
  ;
