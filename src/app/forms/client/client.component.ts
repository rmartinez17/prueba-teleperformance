import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from "../../services/client.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  mobileQuery: MediaQueryList;
  dataSource: any = [];
  dataParams: any = {
    total: 0,
    per_page: 25,
    page: 1,
    filters: [],

  };
  columnsToDisplay = [
    'avatar', 'first_name', 'last_name','email', 
  ];

  constructor(media: MediaMatcher, public dialog: MatDialog,
    public client: ClientService,
  ) { this.mobileQuery = media.matchMedia('(max-width: 600px)'); }

  ngOnInit(): void {
    this.indexClients()

  }
  /**
             * Este metodo se utiliza para listar los clientes del sistema
             *
             * @access public
             * @param 
             * @return 
 */
  indexClients() {
    this.client.index(this.dataParams).subscribe(
      (res: any) => {
        console.log("Array", res)
        this.dataParams.total = res.total;
        this.dataSource = new MatTableDataSource(res.data);

      },
      (err: any) => {
        console.log("Error", err)
        this.dataSource = new MatTableDataSource([]);

      }
    );
  }
  /**
           * Este metodo se utiliza para filtrar por cualquier dato en la tabla de clientes
           *
           * @access public
           * @param evento generado por el input
           * @return 
   */
  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }
  /**
         * Este metodo se utiliza para permitir la paginación en la tabla de clientes
         *
         * @access public
         * @param  evento generado por el componente de paginación
         * @return 
 */
  handlePage(e: PageEvent) {
    this.dataParams.per_page = e.pageSize;
    this.dataParams.page = e.pageIndex + 1;
    this.indexClients();
  }
  /**
           * Este metodo se utiliza para modificar el texto del componente de paginación
           *
           * @access public
           * @param 
           * @return 
   */
  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
    this.paginator._intl.getRangeLabel = this.getRangeLabel

  }
  /**
         * Este metodo se utiliza para modificar el texto del rango del componente de paginación
         *
         * @access public
         * @param 
         * @return rango modificado segun lo especificado
 */
  getRangeLabel(page: number, pageSize: number, length: number): string {
    return new MatPaginatorIntl().getRangeLabel(page, pageSize, length).replace(/[a-z]+/i, 'de');
  };

}
