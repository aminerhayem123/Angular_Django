import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.css']
})
export class LabelListComponent implements OnInit {
  documentContent: any[] | undefined;
  labels: any[] = [];
  selectedLabel: any | null = null;
  annotations: any[] = [];

  constructor(private apiService: ApiService, private http: HttpClient) {}

  ngOnInit() {
    this.apiService.getLabels().subscribe(data => {
      this.labels = data;
    });

    this.apiService.getDocumentContent().subscribe(data => {
      this.documentContent = data;
    });
  }

  labelColor(label: string) {
    switch (label) {
      case 'SKILLS':
        return 'lightblue';
      case 'EXPERIENCE':
        return 'lightgreen';
      case 'DIPLOMA':
        return 'lightpink';
      case 'DIPLOMA_MAJOR':
        return 'LightCyan'; // Update to 'LightCyan'
      default:
        return 'Lightyellow';
    }
  }
  

  selectLabel(label: string) {
    this.selectedLabel = label;
  }

  annotateText(start: number, end: number, text: string) {
    if (this.selectedLabel && start !== end && text.trim() !== '') {
      const existingAnnotation = this.annotations.find(
        annotation =>
          annotation.start === start &&
          annotation.end === end &&
          annotation.label === this.selectedLabel &&
          annotation.text === text
      );

      if (!existingAnnotation) {
        this.annotations.push({
          start: start,
          end: end,
          label: this.selectedLabel,
          text: text
        });
      }
    }
  }

  onTextSelect(event: any) {
    const selection = window.getSelection();
    if (selection) {
      const selectedText = selection.toString().trim();
      if (selectedText !== '') {
        const selectedRange = selection.getRangeAt(0);
        const preSelectionRange = selectedRange.cloneRange();
        preSelectionRange.selectNodeContents(event.target);
        preSelectionRange.setEnd(selectedRange.startContainer, selectedRange.startOffset);
        const start = preSelectionRange.toString().length;
        const end = start + selectedText.length;
  
        const color = this.labelColor(this.selectedLabel!);
  
        const span = document.createElement('span');
        const labelText = `[${this.selectedLabel}] `;
        span.style.backgroundColor = color;
  
        const labelSpan = document.createElement('span');
        labelSpan.textContent = labelText;
        labelSpan.style.color = 'black';
  
        const textNode = document.createTextNode(selectedText);
        span.appendChild(textNode);
  
        const spaceNode = document.createTextNode(' ');
        span.appendChild(spaceNode);
  
        span.appendChild(labelSpan);
  
        selectedRange.deleteContents();
        selectedRange.insertNode(span);
  
        this.annotateText(start, end, selectedText);
      }
    }
  }
  exportAnnotationsToFile() {
    const data = {
      document: this.documentContent,
      annotations: this.annotations
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'annotations.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  
}  
